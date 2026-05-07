import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, "is required")
  .max(80, "must be 80 characters or fewer");

export const eventUpdateSignupSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z.string().trim().min(1, "is required").email("must be a valid email address"),
  source: z.string().trim().min(1).max(50),
});

export type EventUpdateSignupInput = z.infer<typeof eventUpdateSignupSchema>;
