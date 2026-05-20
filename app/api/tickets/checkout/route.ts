import { NextResponse } from "next/server";
import Stripe from "stripe";
import { MERCH_ASSETS } from "@/lib/merch/catalog";
import {
  describePassSelection,
  getCartTotals,
  getPassPriceCents,
  getTicketPackage,
  ticketCartSchema,
  type TicketCart,
  type TicketCartPass,
} from "@/lib/tickets/cart";
import { serverEnv } from "@/lib/env/server";
import {
  createCompletedNoPaymentTicketOrder,
  createPendingStripeTicketOrder,
  markTicketOrderCheckoutFailed,
  updateTicketOrderStripeCheckoutSession,
} from "@/lib/tickets/order-store";

export const runtime = "nodejs";

const stripe = serverEnv.STRIPE_SECRET_KEY
  ? new Stripe(serverEnv.STRIPE_SECRET_KEY)
  : null;
const isCheckoutEnabled =
  process.env.NEXT_PUBLIC_TICKETS_CHECKOUT_ENABLED === "true";

type CheckoutSessionCreateParams = NonNullable<
  Parameters<NonNullable<typeof stripe>["checkout"]["sessions"]["create"]>[0]
>;
type CheckoutLineItem = NonNullable<
  CheckoutSessionCreateParams["line_items"]
>[number];
type CheckoutBrandingSettings = CheckoutSessionCreateParams["branding_settings"];

function getPublicAssetUrl(path: string) {
  const url = new URL(path, serverEnv.APP_URL);

  return url.protocol === "https:" ? url.toString() : undefined;
}

function getCheckoutBrandingSettings(): CheckoutBrandingSettings {
  const iconUrl = getPublicAssetUrl("/icon.png");

  return {
    display_name: "Bubelpalooza",
    background_color: "#FFF1C7",
    button_color: "#E6392E",
    border_style: "rectangular",
    font_family: "inter",
    icon: iconUrl
      ? {
          type: "url",
          url: iconUrl,
        }
      : undefined,
  };
}

function getPackageImagePath(packageId: TicketCartPass["packageId"]) {
  if (packageId === "ultimate") {
    return MERCH_ASSETS.lineupCutout;
  }

  if (packageId === "koozie") {
    return MERCH_ASSETS.standardShortKoozie;
  }

  if (packageId === "sticker") {
    return MERCH_ASSETS.sticker;
  }

  return undefined;
}

function createLineItem(
  name: string,
  unitAmount: number,
  description?: string,
  imagePath?: string,
): CheckoutLineItem {
  const imageUrl = imagePath ? getPublicAssetUrl(imagePath) : undefined;

  return {
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: unitAmount,
      product_data: {
        name,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    },
  };
}

function createPassLineItem(
  pass: TicketCartPass,
  passIndex: number,
): CheckoutLineItem {
  const selectedPackage = getTicketPackage(pass.packageId);

  return createLineItem(
    `Pass ${passIndex + 1}: ${selectedPackage.name}`,
    getPassPriceCents(pass),
    describePassSelection(pass),
    getPackageImagePath(pass.packageId),
  );
}

function createCheckoutLineItems(cart: TicketCart) {
  const lineItems = cart.passes.map(createPassLineItem);

  if (cart.donationCents > 0) {
    lineItems.push(
      createLineItem(
        "Bubelpalooza extra donation",
        cart.donationCents,
        "Order-level donation added once to the full order.",
      ),
    );
  }

  return lineItems;
}

export async function POST(request: Request) {
  if (!isCheckoutEnabled) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Tickets open soon. You can choose your packages now and come back shortly to buy.",
      },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the order and try again.",
      },
      { status: 400 },
    );
  }

  const parsedCart = ticketCartSchema.safeParse(body);

  if (!parsedCart.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please finish the required pass choices before checkout.",
        fieldErrors: parsedCart.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const cart = parsedCart.data;
  const totals = getCartTotals(cart);

  if (totals.totalCents === 0) {
    try {
      await createCompletedNoPaymentTicketOrder(cart);

      return NextResponse.json({
        ok: true,
        url: `${serverEnv.APP_URL}/tickets/success`,
      });
    } catch (error) {
      console.error(
        "Failed to create no-payment ticket order.",
        error instanceof Error ? { name: error.name } : undefined,
      );

      return NextResponse.json(
        {
          ok: false,
          message: "Checkout is not available right now. Please try again soon.",
        },
        { status: 500 },
      );
    }
  }

  if (!stripe) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Checkout is not available right now. Please check back soon.",
      },
      { status: 503 },
    );
  }

  let pendingOrder: Awaited<ReturnType<typeof createPendingStripeTicketOrder>> | null =
    null;

  try {
    pendingOrder = await createPendingStripeTicketOrder(cart);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      branding_settings: getCheckoutBrandingSettings(),
      custom_text: {
        submit: {
          message:
            "Bubelpalooza merch is picked up at check-in on event day.",
        },
      },
      line_items: createCheckoutLineItems(cart),
      success_url: `${serverEnv.APP_URL}/tickets/success`,
      cancel_url: `${serverEnv.APP_URL}/tickets`,
      client_reference_id: pendingOrder.id,
      metadata: {
        source: "tickets_wizard",
        order_id: pendingOrder.id,
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Stripe Checkout session did not return a URL.");
    }

    await updateTicketOrderStripeCheckoutSession({
      orderId: pendingOrder.id,
      stripeCheckoutSessionId: checkoutSession.id,
      stripeCheckoutStatus: checkoutSession.status,
      stripePaymentStatus: checkoutSession.payment_status,
      stripeClientReferenceId: checkoutSession.client_reference_id,
    });

    return NextResponse.json({
      ok: true,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error(
      "Failed to create package Checkout session.",
      error instanceof Error ? { name: error.name } : undefined,
    );

    if (pendingOrder) {
      try {
        await markTicketOrderCheckoutFailed(pendingOrder.id);
      } catch (updateError) {
        console.error(
          "Failed to mark package Checkout order as failed.",
          updateError instanceof Error ? { name: updateError.name } : undefined,
        );
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Checkout is not available right now. Please try again soon.",
      },
      { status: 500 },
    );
  }
}
