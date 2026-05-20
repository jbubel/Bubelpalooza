CREATE TYPE "public"."ticket_koozie_type" AS ENUM('slim-tall', 'standard-short');--> statement-breakpoint
CREATE TYPE "public"."ticket_order_status" AS ENUM('pending', 'completed', 'failed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."ticket_package_id" AS ENUM('ultimate', 'koozie', 'sticker', 'name-your-price');--> statement-breakpoint
CREATE TYPE "public"."ticket_payment_provider" AS ENUM('stripe', 'none');--> statement-breakpoint
CREATE TYPE "public"."ticket_payment_status" AS ENUM('unpaid', 'paid', 'no_payment_required', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."ticket_shirt_color" AS ENUM('black', 'white');--> statement-breakpoint
CREATE TYPE "public"."ticket_shirt_size" AS ENUM('S', 'M', 'L', 'XL', '2XL', '3XL');--> statement-breakpoint
CREATE TYPE "public"."ticket_shirt_style" AS ENUM('tee', 'tank');--> statement-breakpoint
CREATE TABLE "ticket_order_passes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"pass_number" integer NOT NULL,
	"package_id" "ticket_package_id" NOT NULL,
	"price_cents" integer NOT NULL,
	"name_your_price_cents" integer DEFAULT 0 NOT NULL,
	"shirt_style" "ticket_shirt_style",
	"shirt_color" "ticket_shirt_color",
	"shirt_size" "ticket_shirt_size",
	"koozie_type" "ticket_koozie_type",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ticket_order_passes_pass_number_range" CHECK ("ticket_order_passes"."pass_number" >= 1 and "ticket_order_passes"."pass_number" <= 6),
	CONSTRAINT "ticket_order_passes_amounts_nonnegative" CHECK ("ticket_order_passes"."price_cents" >= 0 and "ticket_order_passes"."name_your_price_cents" >= 0),
	CONSTRAINT "ticket_order_passes_name_your_price_matches_package" CHECK ((
        "ticket_order_passes"."package_id" = 'name-your-price' and
        "ticket_order_passes"."name_your_price_cents" = "ticket_order_passes"."price_cents"
      ) or (
        "ticket_order_passes"."package_id" <> 'name-your-price' and
        "ticket_order_passes"."name_your_price_cents" = 0
      )),
	CONSTRAINT "ticket_order_passes_merch_matches_package" CHECK ((
        "ticket_order_passes"."package_id" = 'ultimate' and
        "ticket_order_passes"."shirt_style" is not null and
        "ticket_order_passes"."shirt_color" is not null and
        "ticket_order_passes"."shirt_size" is not null and
        "ticket_order_passes"."koozie_type" is not null
      ) or (
        "ticket_order_passes"."package_id" = 'koozie' and
        "ticket_order_passes"."shirt_style" is null and
        "ticket_order_passes"."shirt_color" is null and
        "ticket_order_passes"."shirt_size" is null and
        "ticket_order_passes"."koozie_type" is not null
      ) or (
        "ticket_order_passes"."package_id" in ('sticker', 'name-your-price') and
        "ticket_order_passes"."shirt_style" is null and
        "ticket_order_passes"."shirt_color" is null and
        "ticket_order_passes"."shirt_size" is null and
        "ticket_order_passes"."koozie_type" is null
      ))
);
--> statement-breakpoint
CREATE TABLE "ticket_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "ticket_order_status" DEFAULT 'pending' NOT NULL,
	"payment_status" "ticket_payment_status" DEFAULT 'unpaid' NOT NULL,
	"payment_provider" "ticket_payment_provider" NOT NULL,
	"currency" text DEFAULT 'usd' NOT NULL,
	"pass_count" integer NOT NULL,
	"pass_subtotal_cents" integer NOT NULL,
	"donation_cents" integer DEFAULT 0 NOT NULL,
	"total_cents" integer NOT NULL,
	"customer_name" text,
	"customer_email" text,
	"stripe_checkout_session_id" text,
	"stripe_checkout_status" text,
	"stripe_payment_intent_id" text,
	"stripe_payment_status" text,
	"stripe_customer_id" text,
	"stripe_client_reference_id" text,
	"completed_at" timestamp with time zone,
	"canceled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ticket_orders_pass_count_range" CHECK ("ticket_orders"."pass_count" >= 1 and "ticket_orders"."pass_count" <= 6),
	CONSTRAINT "ticket_orders_amounts_nonnegative" CHECK ("ticket_orders"."pass_subtotal_cents" >= 0 and "ticket_orders"."donation_cents" >= 0 and "ticket_orders"."total_cents" >= 0),
	CONSTRAINT "ticket_orders_total_matches_parts" CHECK ("ticket_orders"."total_cents" = "ticket_orders"."pass_subtotal_cents" + "ticket_orders"."donation_cents")
);
--> statement-breakpoint
ALTER TABLE "ticket_order_passes" ADD CONSTRAINT "ticket_order_passes_order_id_ticket_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."ticket_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ticket_order_passes_order_id_pass_number_unique" ON "ticket_order_passes" USING btree ("order_id","pass_number");--> statement-breakpoint
CREATE INDEX "ticket_order_passes_order_id_idx" ON "ticket_order_passes" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ticket_orders_stripe_checkout_session_id_unique" ON "ticket_orders" USING btree ("stripe_checkout_session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ticket_orders_stripe_payment_intent_id_unique" ON "ticket_orders" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
CREATE INDEX "ticket_orders_status_idx" ON "ticket_orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ticket_orders_customer_email_idx" ON "ticket_orders" USING btree ("customer_email");
