import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

loadEnvConfig(process.cwd());

const drizzleEnvSchema = z.object({
  DATABASE_URL: z.string().trim().url().optional(),
  DATABASE_URL_UNPOOLED: z.string().trim().url().optional(),
});

const drizzleEnvResult = drizzleEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
});

if (!drizzleEnvResult.success) {
  throw new Error(
    [
      "Invalid database environment variables for Drizzle:",
      ...drizzleEnvResult.error.issues.map(
        (issue) => `- ${issue.path.join(".")}: ${issue.message}`,
      ),
    ].join("\n"),
  );
}

const databaseUrl =
  drizzleEnvResult.data.DATABASE_URL_UNPOOLED ?? drizzleEnvResult.data.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    [
      "Missing database environment variables for Drizzle:",
      "- Set DATABASE_URL or DATABASE_URL_UNPOOLED before running Drizzle commands.",
    ].join("\n"),
  );
}

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});
