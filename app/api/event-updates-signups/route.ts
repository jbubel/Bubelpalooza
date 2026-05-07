import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { saveEventUpdateSignup } from "@/lib/event-updates/service";
import { eventUpdateSignupSchema } from "@/lib/event-updates/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = eventUpdateSignupSchema.parse(body);
    const result = await saveEventUpdateSignup(parsed);

    return NextResponse.json({
      ok: true,
      status: result.status,
      message:
        "You are on the list for Bubelpalooza announcements, including ticket on-sale updates.",
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

    console.error("Failed to save event update signup", error);

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
