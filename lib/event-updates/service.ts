import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { eventUpdateSignups } from "@/lib/db/schema";
import {
  type EventUpdateSignupInput,
  eventUpdateSignupSchema,
} from "@/lib/event-updates/schema";

function normalizeSignup(input: EventUpdateSignupInput) {
  return {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    source: input.source.trim(),
  };
}

export async function saveEventUpdateSignup(input: EventUpdateSignupInput) {
  const parsed = eventUpdateSignupSchema.parse(input);
  const signup = normalizeSignup(parsed);
  const db = getDb();

  const existingSignup = await db.query.eventUpdateSignups.findFirst({
    where: eq(eventUpdateSignups.email, signup.email),
  });

  if (existingSignup) {
    return {
      status: "duplicate" as const,
      signup: existingSignup,
    };
  }

  const [createdSignup] = await db
    .insert(eventUpdateSignups)
    .values({
      ...signup,
      status: "subscribed",
    })
    .returning();

  return {
    status: "created" as const,
    signup: createdSignup,
  };
}
