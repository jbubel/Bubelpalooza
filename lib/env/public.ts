import { z } from "zod";
import { formatEnvErrors, optionalSecret, optionalUrl } from "@/lib/env/shared";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: optionalUrl,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optionalSecret,
  NEXT_PUBLIC_SENTRY_DSN: optionalUrl,
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
