import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  KOOZIE_TYPE_VALUES,
  MAX_PASSES_PER_ORDER,
  PACKAGE_VALUES,
  SHIRT_COLOR_VALUES,
  SHIRT_SIZE_VALUES,
  SHIRT_STYLE_VALUES,
} from "@/lib/tickets/constants";

export const eventUpdateSignups = pgTable("event_update_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").unique(),
  source: text("source").notNull(),
  status: text("status").notNull().default("subscribed"),
  smsConsentStatus: text("sms_consent_status").notNull().default("not_subscribed"),
  smsConsentAt: timestamp("sms_consent_at", { withTimezone: true }),
  smsConsentSource: text("sms_consent_source"),
  smsConsentCopyVersion: text("sms_consent_copy_version"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const ticketOrderStatusEnum = pgEnum("ticket_order_status", [
  "pending",
  "completed",
  "failed",
  "canceled",
]);

export const ticketPaymentStatusEnum = pgEnum("ticket_payment_status", [
  "unpaid",
  "paid",
  "no_payment_required",
  "failed",
  "refunded",
]);

export const ticketPaymentProviderEnum = pgEnum("ticket_payment_provider", [
  "stripe",
  "none",
]);

export const ticketPackageIdEnum = pgEnum("ticket_package_id", PACKAGE_VALUES);
export const ticketShirtStyleEnum = pgEnum("ticket_shirt_style", SHIRT_STYLE_VALUES);
export const ticketShirtColorEnum = pgEnum("ticket_shirt_color", SHIRT_COLOR_VALUES);
export const ticketShirtSizeEnum = pgEnum("ticket_shirt_size", SHIRT_SIZE_VALUES);
export const ticketKoozieTypeEnum = pgEnum("ticket_koozie_type", KOOZIE_TYPE_VALUES);

export const ticketOrders = pgTable(
  "ticket_orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    status: ticketOrderStatusEnum("status").notNull().default("pending"),
    paymentStatus: ticketPaymentStatusEnum("payment_status")
      .notNull()
      .default("unpaid"),
    paymentProvider: ticketPaymentProviderEnum("payment_provider").notNull(),
    currency: text("currency").notNull().default("usd"),
    passCount: integer("pass_count").notNull(),
    passSubtotalCents: integer("pass_subtotal_cents").notNull(),
    donationCents: integer("donation_cents").notNull().default(0),
    totalCents: integer("total_cents").notNull(),
    customerName: text("customer_name"),
    customerEmail: text("customer_email"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id"),
    stripeCheckoutStatus: text("stripe_checkout_status"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripePaymentStatus: text("stripe_payment_status"),
    stripeCustomerId: text("stripe_customer_id"),
    stripeClientReferenceId: text("stripe_client_reference_id"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("ticket_orders_stripe_checkout_session_id_unique").on(
      table.stripeCheckoutSessionId,
    ),
    uniqueIndex("ticket_orders_stripe_payment_intent_id_unique").on(
      table.stripePaymentIntentId,
    ),
    index("ticket_orders_status_idx").on(table.status),
    index("ticket_orders_customer_email_idx").on(table.customerEmail),
    check(
      "ticket_orders_pass_count_range",
      sql`${table.passCount} >= 1 and ${table.passCount} <= ${sql.raw(
        String(MAX_PASSES_PER_ORDER),
      )}`,
    ),
    check(
      "ticket_orders_amounts_nonnegative",
      sql`${table.passSubtotalCents} >= 0 and ${table.donationCents} >= 0 and ${table.totalCents} >= 0`,
    ),
    check(
      "ticket_orders_total_matches_parts",
      sql`${table.totalCents} = ${table.passSubtotalCents} + ${table.donationCents}`,
    ),
  ],
);

export const ticketOrderPasses = pgTable(
  "ticket_order_passes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => ticketOrders.id, { onDelete: "cascade" }),
    passNumber: integer("pass_number").notNull(),
    packageId: ticketPackageIdEnum("package_id").notNull(),
    priceCents: integer("price_cents").notNull(),
    nameYourPriceCents: integer("name_your_price_cents").notNull().default(0),
    shirtStyle: ticketShirtStyleEnum("shirt_style"),
    shirtColor: ticketShirtColorEnum("shirt_color"),
    shirtSize: ticketShirtSizeEnum("shirt_size"),
    koozieType: ticketKoozieTypeEnum("koozie_type"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("ticket_order_passes_order_id_pass_number_unique").on(
      table.orderId,
      table.passNumber,
    ),
    index("ticket_order_passes_order_id_idx").on(table.orderId),
    check(
      "ticket_order_passes_pass_number_range",
      sql`${table.passNumber} >= 1 and ${table.passNumber} <= ${sql.raw(
        String(MAX_PASSES_PER_ORDER),
      )}`,
    ),
    check(
      "ticket_order_passes_amounts_nonnegative",
      sql`${table.priceCents} >= 0 and ${table.nameYourPriceCents} >= 0`,
    ),
    check(
      "ticket_order_passes_name_your_price_matches_package",
      sql`(
        ${table.packageId} = 'name-your-price' and
        ${table.nameYourPriceCents} = ${table.priceCents}
      ) or (
        ${table.packageId} <> 'name-your-price' and
        ${table.nameYourPriceCents} = 0
      )`,
    ),
    check(
      "ticket_order_passes_merch_matches_package",
      sql`(
        ${table.packageId} = 'ultimate' and
        ${table.shirtStyle} is not null and
        ${table.shirtColor} is not null and
        ${table.shirtSize} is not null and
        ${table.koozieType} is not null
      ) or (
        ${table.packageId} = 'koozie' and
        ${table.shirtStyle} is null and
        ${table.shirtColor} is null and
        ${table.shirtSize} is null and
        ${table.koozieType} is not null
      ) or (
        ${table.packageId} in ('sticker', 'name-your-price') and
        ${table.shirtStyle} is null and
        ${table.shirtColor} is null and
        ${table.shirtSize} is null and
        ${table.koozieType} is null
      )`,
    ),
  ],
);

export type EventUpdateSignup = typeof eventUpdateSignups.$inferSelect;
export type NewEventUpdateSignup = typeof eventUpdateSignups.$inferInsert;
export type TicketOrder = typeof ticketOrders.$inferSelect;
export type NewTicketOrder = typeof ticketOrders.$inferInsert;
export type TicketOrderPass = typeof ticketOrderPasses.$inferSelect;
export type NewTicketOrderPass = typeof ticketOrderPasses.$inferInsert;
