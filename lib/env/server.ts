import { z } from "zod";
import {
  formatEnvErrors,
  optionalEmail,
  optionalPhoneNumber,
  optionalSecret,
  optionalUrl,
} from "@/lib/env/shared";
import { publicEnv } from "@/lib/env/public";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: optionalUrl,
  DATABASE_URL_UNPOOLED: optionalUrl,
  STRIPE_SECRET_KEY: optionalSecret,
  STRIPE_WEBHOOK_SECRET: optionalSecret,
  RESEND_API_KEY: optionalSecret,
  RESEND_FROM_EMAIL: optionalEmail,
  TWILIO_ACCOUNT_SID: optionalSecret,
  TWILIO_AUTH_TOKEN: optionalSecret,
  TWILIO_PHONE_NUMBER: optionalPhoneNumber,
  SENTRY_DSN: optionalUrl,
  SENTRY_AUTH_TOKEN: optionalSecret,
});

const serverEnvResult = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
});

if (!serverEnvResult.success) {
  throw new Error(formatEnvErrors(serverEnvResult.error, "server"));
}

export const serverEnv = {
  ...serverEnvResult.data,
  ...publicEnv,
};

export function ensureServerEnv() {
  return serverEnv;
}

export type ServerEnv = typeof serverEnv;
