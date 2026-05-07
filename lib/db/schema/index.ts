import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const eventUpdateSignups = pgTable("event_update_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  source: text("source").notNull(),
  status: text("status").notNull().default("subscribed"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type EventUpdateSignup = typeof eventUpdateSignups.$inferSelect;
export type NewEventUpdateSignup = typeof eventUpdateSignups.$inferInsert;
