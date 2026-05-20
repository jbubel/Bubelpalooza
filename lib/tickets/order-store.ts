import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ticketOrderPasses, ticketOrders } from "@/lib/db/schema";
import type { TicketCart } from "@/lib/tickets/cart";
import { createTicketOrderSnapshot } from "@/lib/tickets/orders";

type PersistedTicketOrder = {
  id: string;
  passCount: number;
  passSubtotalCents: number;
  donationCents: number;
  totalCents: number;
};

type CreateTicketOrderOptions = {
  cart: TicketCart;
  paymentProvider: "stripe" | "none";
  status: "pending" | "completed";
  paymentStatus: "unpaid" | "no_payment_required";
  completedAt?: Date;
};

type StripeCheckoutSessionUpdate = {
  orderId: string;
  stripeCheckoutSessionId: string;
  stripeCheckoutStatus: string | null;
  stripePaymentStatus: string | null;
  stripeClientReferenceId: string | null;
};

function createTicketOrderPassRows(
  orderId: string,
  snapshot: ReturnType<typeof createTicketOrderSnapshot>,
) {
  return snapshot.passes.map((pass) => ({
    orderId,
    passNumber: pass.passNumber,
    packageId: pass.packageId,
    priceCents: pass.priceCents,
    nameYourPriceCents: pass.nameYourPriceCents,
    shirtStyle: pass.shirtSelection?.style ?? null,
    shirtColor: pass.shirtSelection?.color ?? null,
    shirtSize: pass.shirtSelection?.size ?? null,
    koozieType: pass.koozieSelection?.type ?? null,
  }));
}

async function createTicketOrder({
  cart,
  paymentProvider,
  status,
  paymentStatus,
  completedAt,
}: CreateTicketOrderOptions): Promise<PersistedTicketOrder> {
  const db = getDb();
  const orderId = crypto.randomUUID();
  const snapshot = createTicketOrderSnapshot(cart);
  const passRows = createTicketOrderPassRows(orderId, snapshot);

  await db.batch([
    db.insert(ticketOrders).values({
      id: orderId,
      status,
      paymentStatus,
      paymentProvider,
      currency: "usd",
      passCount: snapshot.passes.length,
      passSubtotalCents: snapshot.passSubtotalCents,
      donationCents: snapshot.donationCents,
      totalCents: snapshot.totalCents,
      stripeClientReferenceId: paymentProvider === "stripe" ? orderId : null,
      completedAt,
    }),
    db.insert(ticketOrderPasses).values(passRows),
  ]);

  return {
    id: orderId,
    passCount: snapshot.passes.length,
    passSubtotalCents: snapshot.passSubtotalCents,
    donationCents: snapshot.donationCents,
    totalCents: snapshot.totalCents,
  };
}

export function createPendingStripeTicketOrder(cart: TicketCart) {
  return createTicketOrder({
    cart,
    paymentProvider: "stripe",
    status: "pending",
    paymentStatus: "unpaid",
  });
}

export function createCompletedNoPaymentTicketOrder(cart: TicketCart) {
  return createTicketOrder({
    cart,
    paymentProvider: "none",
    status: "completed",
    paymentStatus: "no_payment_required",
    completedAt: new Date(),
  });
}

export async function updateTicketOrderStripeCheckoutSession({
  orderId,
  stripeCheckoutSessionId,
  stripeCheckoutStatus,
  stripePaymentStatus,
  stripeClientReferenceId,
}: StripeCheckoutSessionUpdate) {
  const db = getDb();

  await db
    .update(ticketOrders)
    .set({
      stripeCheckoutSessionId,
      stripeCheckoutStatus,
      stripePaymentStatus,
      stripeClientReferenceId,
      updatedAt: new Date(),
    })
    .where(eq(ticketOrders.id, orderId));
}

export async function markTicketOrderCheckoutFailed(orderId: string) {
  const db = getDb();

  await db
    .update(ticketOrders)
    .set({
      status: "failed",
      paymentStatus: "failed",
      updatedAt: new Date(),
    })
    .where(eq(ticketOrders.id, orderId));
}
