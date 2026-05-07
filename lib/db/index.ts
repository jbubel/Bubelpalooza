import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/lib/db/schema";
import { serverEnv } from "@/lib/env/server";

let databaseInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDatabaseUrl() {
  const databaseUrl = serverEnv.DATABASE_URL ?? serverEnv.DATABASE_URL_UNPOOLED;

  if (!databaseUrl) {
    throw new Error(
      [
        "Database connection is not configured.",
        "- Set DATABASE_URL or DATABASE_URL_UNPOOLED before using the database client.",
      ].join("\n"),
    );
  }

  return databaseUrl;
}

export function getDb() {
  if (!databaseInstance) {
    const sql = neon(getDatabaseUrl());
    databaseInstance = drizzle({ client: sql, schema });
  }

  return databaseInstance;
}

export type Db = ReturnType<typeof getDb>;
