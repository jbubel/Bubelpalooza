import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { eventUpdateSignups } from "@/lib/db/schema";
import { EVENT_UPDATES_SMS_CONSENT_COPY_VERSION } from "@/lib/event-updates/constants";
import {
  type EventUpdateSignupInput,
  eventUpdateSignupSchema,
} from "@/lib/event-updates/schema";

function normalizeSignup(input: EventUpdateSignupInput) {
  return {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phoneNumber: input.phoneNumber,
    smsOptIn: input.smsOptIn,
    source: input.source.trim(),
  };
}

function getSmsConsentValues(
  signup: ReturnType<typeof normalizeSignup>,
  consentedAt: Date,
) {
  if (!signup.phoneNumber || !signup.smsOptIn) {
    return {};
  }

  return {
    phoneNumber: signup.phoneNumber,
    smsConsentStatus: "subscribed",
    smsConsentAt: consentedAt,
    smsConsentSource: signup.source,
    smsConsentCopyVersion: EVENT_UPDATES_SMS_CONSENT_COPY_VERSION,
  };
}

function canUpdateSmsConsent(
  existingSignup: typeof eventUpdateSignups.$inferSelect,
  phoneNumber: string,
) {
  return (
    existingSignup.phoneNumber !== phoneNumber ||
    existingSignup.smsConsentStatus !== "subscribed" ||
    !existingSignup.smsConsentAt ||
    existingSignup.smsConsentCopyVersion !== EVENT_UPDATES_SMS_CONSENT_COPY_VERSION
  );
}

export async function saveEventUpdateSignup(input: EventUpdateSignupInput) {
  const parsed = eventUpdateSignupSchema.parse(input);
  const signup = normalizeSignup(parsed);
  const db = getDb();
  const consentedAt = new Date();

  const existingSignup = await db.query.eventUpdateSignups.findFirst({
    where: eq(eventUpdateSignups.email, signup.email),
  });

  const existingPhoneSignup = signup.phoneNumber
    ? await db.query.eventUpdateSignups.findFirst({
        where: eq(eventUpdateSignups.phoneNumber, signup.phoneNumber),
      })
    : null;

  if (existingSignup) {
    if (
      signup.phoneNumber &&
      signup.smsOptIn &&
      (!existingPhoneSignup || existingPhoneSignup.id === existingSignup.id) &&
      canUpdateSmsConsent(existingSignup, signup.phoneNumber)
    ) {
      const [updatedSignup] = await db
        .update(eventUpdateSignups)
        .set({
          ...getSmsConsentValues(signup, consentedAt),
          updatedAt: consentedAt,
        })
        .where(eq(eventUpdateSignups.id, existingSignup.id))
        .returning();

      return {
        status: "updated" as const,
        signup: updatedSignup,
      };
    }

    return {
      status: "duplicate" as const,
      signup: existingSignup,
    };
  }

  const [createdSignup] = await db
    .insert(eventUpdateSignups)
    .values({
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email,
      source: signup.source,
      status: "subscribed",
      ...(!existingPhoneSignup ? getSmsConsentValues(signup, consentedAt) : {}),
    })
    .returning();

  return {
    status: "created" as const,
    signup: createdSignup,
  };
}
