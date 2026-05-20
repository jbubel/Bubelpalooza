import { z } from "zod";
import {
  koozieTypeOptions,
  shirtColorOptions,
  shirtStyleOptions,
  type KoozieSelection,
  type ShirtSelection,
} from "@/lib/merch/catalog";
import {
  formatCents,
  getCartTotals,
  getPassPriceCents,
  getTicketPackage,
  ticketCartSchema,
  type TicketCart,
  type TicketCartPass,
} from "@/lib/tickets/cart";

type RenderedEmail = {
  subject: string;
  previewText: string;
  html: string;
  text: string;
};

type PassSummary = {
  heading: string;
  price: string;
  description: string;
  includes: string[];
  merch: string[];
};

type OrderSummaryRow = {
  label: string;
  value: string;
};

const eventDetails = {
  name: "Bubelpalooza",
  date: "Sunday, May 24, 2026",
  location: "Bubel Beach Club, Leander, TX",
  poolOpens: "12 PM",
  boilStarts: "1 PM",
  musicStarts: "2:30 PM",
  menu: "Crawfish, shrimp, sausage, potatoes, mushrooms, corn, dirty rice",
} as const;

const optionalTrimmedString = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;
  },
  z.string().min(1).max(160).optional(),
);

const optionalEmailAddress = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;
  },
  z.string().email().optional(),
);

export const orderConfirmationEmailInputSchema = z.object({
  order: z
    .object({
      reference: optionalTrimmedString,
      purchaserName: optionalTrimmedString,
      purchaserEmail: optionalEmailAddress,
    })
    .optional()
    .default({}),
  cart: ticketCartSchema,
});

export type OrderConfirmationEmailInput = z.input<
  typeof orderConfirmationEmailInputSchema
>;
export type ParsedOrderConfirmationEmailInput = z.output<
  typeof orderConfirmationEmailInputSchema
>;
export type RenderedOrderConfirmationEmail = RenderedEmail;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getOptionLabel<TValue extends string>(
  options: readonly { value: TValue; label: string }[],
  value: TValue,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatShirtSelection(selection: ShirtSelection) {
  const color = getOptionLabel(shirtColorOptions, selection.color);
  const style = getOptionLabel(shirtStyleOptions, selection.style).toLowerCase();

  return `${color} ${style}, size ${selection.size}`;
}

function formatKoozieSelection(selection: KoozieSelection) {
  return getOptionLabel(koozieTypeOptions, selection.type);
}

function getPassMerchSummary(pass: TicketCartPass) {
  const selectedPackage = getTicketPackage(pass.packageId);
  const merch: string[] = [];

  if (pass.shirtSelection) {
    merch.push(`Shirt: ${formatShirtSelection(pass.shirtSelection)}`);
  }

  if (pass.koozieSelection) {
    merch.push(`Koozie: ${formatKoozieSelection(pass.koozieSelection)}`);
  }

  if (selectedPackage.includes.includes("Sticker")) {
    merch.push("Sticker: included");
  }

  return merch.length > 0 ? merch : ["No merch selections for this pass"];
}

function getPassSummaries(cart: TicketCart): PassSummary[] {
  return cart.passes.map((pass, index) => {
    const selectedPackage = getTicketPackage(pass.packageId);

    return {
      heading: `Pass ${index + 1}: ${selectedPackage.name}`,
      price: formatCents(getPassPriceCents(pass)),
      description:
        pass.packageId === "name-your-price"
          ? `${selectedPackage.description} Pass contribution: ${formatCents(
              pass.nameYourPriceCents,
            )}.`
          : selectedPackage.description,
      includes: selectedPackage.includes,
      merch: getPassMerchSummary(pass).map(sentenceCase),
    };
  });
}

function getOrderSummaryRows(
  input: ParsedOrderConfirmationEmailInput,
): OrderSummaryRow[] {
  const totals = getCartTotals(input.cart);
  const rows: OrderSummaryRow[] = [
    {
      label: "Passes",
      value: `${input.cart.passes.length}`,
    },
    {
      label: "Pass subtotal",
      value: formatCents(totals.passSubtotalCents),
    },
  ];

  if (input.order.reference) {
    rows.unshift({
      label: "Order",
      value: input.order.reference,
    });
  }

  if (input.order.purchaserEmail) {
    rows.push({
      label: "Email",
      value: input.order.purchaserEmail,
    });
  }

  if (totals.donationCents > 0) {
    rows.push({
      label: "Extra donation",
      value: formatCents(totals.donationCents),
    });
  }

  rows.push({
    label: "Order total",
    value: formatCents(totals.totalCents),
  });

  return rows;
}

function renderHtmlList(items: string[]) {
  return items
    .map(
      (item) =>
        `<li style="margin:0 0 6px 0;padding:0;">${escapeHtml(item)}</li>`,
    )
    .join("");
}

function renderOrderRows(rows: OrderSummaryRow[]) {
  return rows
    .map(
      (row) => `<tr>
        <td style="padding:8px 0;color:#183A59;font-size:14px;">${escapeHtml(
          row.label,
        )}</td>
        <td style="padding:8px 0;color:#101827;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(
          row.value,
        )}</td>
      </tr>`,
    )
    .join("");
}

function renderPassHtml(pass: PassSummary) {
  return `<section style="border:2px solid #101827;background:#FFF7E6;margin:0 0 16px 0;padding:18px;">
    <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:8px;">
      <h3 style="margin:0;color:#101827;font-size:20px;line-height:1.2;text-transform:uppercase;letter-spacing:0;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
        pass.heading,
      )}</h3>
      <strong style="color:#E6392E;font-size:18px;white-space:nowrap;">${escapeHtml(
        pass.price,
      )}</strong>
    </div>
    <p style="margin:0 0 12px 0;color:#172033;font-size:15px;line-height:1.5;">${escapeHtml(
      pass.description,
    )}</p>
    <p style="margin:0 0 6px 0;color:#101827;font-size:14px;font-weight:700;text-transform:uppercase;">Package summary</p>
    <ul style="margin:0 0 14px 18px;padding:0;color:#172033;font-size:14px;line-height:1.4;">
      ${renderHtmlList(pass.includes)}
    </ul>
    <p style="margin:0 0 6px 0;color:#101827;font-size:14px;font-weight:700;text-transform:uppercase;">Merch selections</p>
    <ul style="margin:0 0 0 18px;padding:0;color:#172033;font-size:14px;line-height:1.4;">
      ${renderHtmlList(pass.merch)}
    </ul>
  </section>`;
}

function renderHtml(input: ParsedOrderConfirmationEmailInput) {
  const passSummaries = getPassSummaries(input.cart);
  const orderRows = getOrderSummaryRows(input);
  const greetingName = input.order.purchaserName ?? "there";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your ${eventDetails.name} confirmation</title>
  </head>
  <body style="margin:0;background:#101827;color:#172033;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;opacity:0;">
      Your passes are confirmed for ${eventDetails.date}. Merch is picked up at check-in on event day.
    </div>
    <main style="background:#FFD447;margin:0 auto;max-width:680px;padding:28px 18px 34px 18px;">
      <section style="border:3px solid #101827;background:#FFF1C7;box-shadow:8px 8px 0 #E6392E;padding:24px;margin:0 0 24px 0;">
        <p style="margin:0 0 8px 0;color:#183A59;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0;">Order confirmation</p>
        <h1 style="margin:0 0 14px 0;color:#101827;font-size:34px;line-height:1;text-transform:uppercase;letter-spacing:0;font-family:Arial Black,Arial,Helvetica,sans-serif;">You're in for ${eventDetails.name}</h1>
        <p style="margin:0;color:#172033;font-size:16px;line-height:1.5;">Hi ${escapeHtml(
          greetingName,
        )}, your passes are confirmed for ${eventDetails.date} at ${eventDetails.location}.</p>
      </section>

      <section style="border:2px solid #101827;background:#FFFFFF;padding:18px;margin:0 0 20px 0;">
        <h2 style="margin:0 0 12px 0;color:#101827;font-size:22px;line-height:1.1;text-transform:uppercase;letter-spacing:0;">Order Details</h2>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tbody>${renderOrderRows(orderRows)}</tbody>
        </table>
      </section>

      <section style="border:2px solid #101827;background:#2EC4F3;padding:18px;margin:0 0 20px 0;">
        <h2 style="margin:0 0 12px 0;color:#101827;font-size:22px;line-height:1.1;text-transform:uppercase;letter-spacing:0;">Event Day</h2>
        <p style="margin:0 0 8px 0;color:#101827;font-size:15px;line-height:1.5;"><strong>Pool opens:</strong> ${eventDetails.poolOpens}</p>
        <p style="margin:0 0 8px 0;color:#101827;font-size:15px;line-height:1.5;"><strong>Boil hits the table:</strong> ${eventDetails.boilStarts}</p>
        <p style="margin:0 0 8px 0;color:#101827;font-size:15px;line-height:1.5;"><strong>Live music kicks off:</strong> ${eventDetails.musicStarts}</p>
        <p style="margin:0;color:#101827;font-size:15px;line-height:1.5;"><strong>Food menu:</strong> ${eventDetails.menu}</p>
      </section>

      <section style="margin:0 0 20px 0;">
        <h2 style="margin:0 0 12px 0;color:#101827;font-size:22px;line-height:1.1;text-transform:uppercase;letter-spacing:0;">Passes And Merch</h2>
        ${passSummaries.map(renderPassHtml).join("")}
      </section>

      <section style="border:2px solid #101827;background:#FFF1C7;padding:18px;">
        <h2 style="margin:0 0 8px 0;color:#101827;font-size:20px;line-height:1.1;text-transform:uppercase;letter-spacing:0;">Merch Pickup</h2>
        <p style="margin:0;color:#172033;font-size:15px;line-height:1.5;">Bubelpalooza merch is picked up at check-in on event day.</p>
      </section>
    </main>
  </body>
</html>`;
}

function renderText(input: ParsedOrderConfirmationEmailInput) {
  const passSummaries = getPassSummaries(input.cart);
  const orderRows = getOrderSummaryRows(input);
  const greetingName = input.order.purchaserName ?? "there";
  const sections = [
    `Hi ${greetingName},`,
    `Your passes are confirmed for ${eventDetails.name} on ${eventDetails.date} at ${eventDetails.location}.`,
    [
      "Order details",
      ...orderRows.map((row) => `${row.label}: ${row.value}`),
    ].join("\n"),
    [
      "Event day",
      `Pool opens: ${eventDetails.poolOpens}`,
      `Boil hits the table: ${eventDetails.boilStarts}`,
      `Live music kicks off: ${eventDetails.musicStarts}`,
      `Food menu: ${eventDetails.menu}`,
    ].join("\n"),
    [
      "Passes and merch",
      ...passSummaries.flatMap((pass) => [
        `${pass.heading} - ${pass.price}`,
        pass.description,
        `Package summary: ${pass.includes.join(", ")}`,
        `Merch selections: ${pass.merch.join("; ")}`,
        "",
      ]),
    ]
      .join("\n")
      .trim(),
    "Merch pickup\nBubelpalooza merch is picked up at check-in on event day.",
  ];

  return sections.join("\n\n");
}

export function renderOrderConfirmationEmail(
  input: OrderConfirmationEmailInput,
): RenderedOrderConfirmationEmail {
  const parsedInput = orderConfirmationEmailInputSchema.parse(input);
  const orderReference = parsedInput.order.reference
    ? ` ${parsedInput.order.reference}`
    : "";

  return {
    subject: `Your ${eventDetails.name} confirmation${orderReference}`,
    previewText: `Your passes are confirmed for ${eventDetails.date}. Merch is picked up at check-in on event day.`,
    html: renderHtml(parsedInput),
    text: renderText(parsedInput),
  };
}
