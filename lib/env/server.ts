import { z } from "zod";
import {
  envUrl,
  formatEnvErrors,
  optionalDomain,
  optionalEmail,
  optionalEnv,
  optionalPhoneNumber,
  optionalSecret,
  optionalUrl,
  toHttpsUrl,
} from "@/lib/env/shared";
import { publicEnv } from "@/lib/env/public";

const serverEnvSchema = z
  .object({
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
    VERCEL_ENV: optionalEnv(z.enum(["production", "preview", "development"])),
    VERCEL_TARGET_ENV: optionalSecret,
    VERCEL_URL: optionalDomain,
    VERCEL_BRANCH_URL: optionalDomain,
    VERCEL_PROJECT_PRODUCTION_URL: optionalDomain,
  })
  .superRefine((env, context) => {
    if (!env.DATABASE_URL && !env.DATABASE_URL_UNPOOLED) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["DATABASE_URL"],
        message: "or DATABASE_URL_UNPOOLED is required",
      });
    }
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
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_TARGET_ENV: process.env.VERCEL_TARGET_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});

if (!serverEnvResult.success) {
  throw new Error(formatEnvErrors(serverEnvResult.error, "server"));
}

const parsedServerEnv = serverEnvResult.data;

function resolveAppUrl() {
  if (publicEnv.NEXT_PUBLIC_APP_URL) {
    return publicEnv.NEXT_PUBLIC_APP_URL;
  }

  const vercelCandidate =
    parsedServerEnv.VERCEL_ENV === "preview"
      ? parsedServerEnv.VERCEL_BRANCH_URL ?? parsedServerEnv.VERCEL_URL
      : parsedServerEnv.VERCEL_PROJECT_PRODUCTION_URL ?? parsedServerEnv.VERCEL_URL;

  const appUrlResult = envUrl.safeParse(
    vercelCandidate ? toHttpsUrl(vercelCandidate) : undefined,
  );

  if (!appUrlResult.success) {
    throw new Error(
      [
        "Invalid application URL configuration:",
        "- Set NEXT_PUBLIC_APP_URL for local development and non-Vercel environments.",
        "- Or enable Vercel system environment variables for preview and production deployments.",
      ].join("\n"),
    );
  }

  return appUrlResult.data;
}

export const serverEnv = {
  ...parsedServerEnv,
  ...publicEnv,
  APP_URL: resolveAppUrl(),
};

export function ensureServerEnv() {
  return serverEnv;
}

export type ServerEnv = typeof serverEnv;
