ALTER TABLE "event_update_signups" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "event_update_signups" ADD COLUMN "sms_consent_status" text DEFAULT 'not_subscribed' NOT NULL;--> statement-breakpoint
ALTER TABLE "event_update_signups" ADD COLUMN "sms_consent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "event_update_signups" ADD COLUMN "sms_consent_source" text;--> statement-breakpoint
ALTER TABLE "event_update_signups" ADD COLUMN "sms_consent_copy_version" text;--> statement-breakpoint
ALTER TABLE "event_update_signups" ADD CONSTRAINT "event_update_signups_phone_number_unique" UNIQUE("phone_number");