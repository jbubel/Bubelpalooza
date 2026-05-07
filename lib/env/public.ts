import { z } from "zod";
import { envSecretValue, envUrlValue, formatEnvErrors } from "@/lib/env/shared";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: envUrlValue,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: envSecretValue,
  NEXT_PUBLIC_SENTRY_DSN: envUrlValue,
});

const publicEnvResult = publicEnvSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

if (!publicEnvResult.success) {
  throw new Error(formatEnvErrors(publicEnvResult.error, "public"));
}

export const publicEnv = publicEnvResult.data;

export type PublicEnv = typeof publicEnv;
