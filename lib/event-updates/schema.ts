import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, "is required")
  .max(80, "must be 80 characters or fewer");

const usPhoneNumberPattern = /^\+1[2-9]\d{2}[2-9]\d{6}$/;

function normalizeUsPhoneNumber(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const digits = trimmedValue.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return trimmedValue;
}

const optionalPhoneNumberSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    return normalizeUsPhoneNumber(value);
  },
  z
    .string()
    .regex(usPhoneNumberPattern, "must be a valid US phone number")
    .optional(),
);

export const eventUpdateSignupSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z.string().trim().min(1, "is required").email("must be a valid email address"),
  phoneNumber: optionalPhoneNumberSchema,
  smsOptIn: z.boolean().optional().default(false),
  source: z.string().trim().min(1).max(50),
}).superRefine((signup, context) => {
  if (signup.phoneNumber && !signup.smsOptIn) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["smsOptIn"],
      message: "is required to receive text updates",
    });
  }

  if (!signup.phoneNumber && signup.smsOptIn) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phoneNumber"],
      message: "is required to receive text updates",
    });
  }
});

export type EventUpdateSignupInput = z.infer<typeof eventUpdateSignupSchema>;
