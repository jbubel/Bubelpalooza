import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sendEventUpdateWelcomeEmail } from "@/lib/event-updates/email";
import { saveEventUpdateSignup } from "@/lib/event-updates/service";
import { eventUpdateSignupSchema } from "@/lib/event-updates/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = eventUpdateSignupSchema.parse(body);
    const result = await saveEventUpdateSignup(parsed);

    if (result.status === "created") {
      const emailResult = await sendEventUpdateWelcomeEmail(result.signup);

      if (emailResult.status === "skipped") {
        console.warn(
          "Event updates welcome email skipped because the hosted template is not configured.",
        );
      }

      if (emailResult.status === "failed") {
        console.warn("Event updates welcome email failed after signup capture.");
      }
    }

    return NextResponse.json({
      ok: true,
      status: result.status,
      message:
        "Thanks for your interest in Bubelpalooza. We will send details as they are ready.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors;

      return NextResponse.json(
        {
          ok: false,
          message: "Please check the form and try again.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error(
      "Failed to save event update signup.",
      error instanceof Error ? { name: error.name } : undefined,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not save your signup right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
