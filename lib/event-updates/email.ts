import { Resend } from "resend";
import type { EventUpdateSignup } from "@/lib/db/schema";
import { serverEnv } from "@/lib/env/server";
import { resendTemplateIds } from "@/lib/notifications/resend-templates";

type WelcomeEmailResult =
  | { status: "sent"; emailId: string }
  | { status: "skipped"; reason: "missing-configuration" }
  | { status: "failed"; reason: "provider-error" };

let resendClient: Resend | null = null;

function getResendClient() {
  if (!serverEnv.RESEND_API_KEY) {
    return null;
  }

  resendClient ??= new Resend(serverEnv.RESEND_API_KEY);

  return resendClient;
}

function sanitizeTemplateVariable(value: string) {
  return value.replace(/[<>&]/g, "").trim() || "friend";
}

export async function sendEventUpdateWelcomeEmail(
  signup: Pick<EventUpdateSignup, "firstName" | "email">,
): Promise<WelcomeEmailResult> {
  const resend = getResendClient();
  const templateId = resendTemplateIds.eventUpdatesWelcome;

  if (!resend || !serverEnv.RESEND_FROM_EMAIL || !templateId) {
    return { status: "skipped", reason: "missing-configuration" };
  }

  const response = await resend.emails
    .send({
      from: serverEnv.RESEND_FROM_EMAIL,
      to: signup.email,
      template: {
        id: templateId,
        variables: {
          GUEST_FIRST_NAME: sanitizeTemplateVariable(signup.firstName),
        },
      },
      tags: [
        {
          name: "flow",
          value: "event_updates_welcome",
        },
      ],
    })
    .catch(() => null);

  if (!response) {
    return { status: "failed", reason: "provider-error" };
  }

  if (response.error) {
    return { status: "failed", reason: "provider-error" };
  }

  return { status: "sent", emailId: response.data.id };
}
