import { z } from "zod";

const emptyStringToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const validUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const optionalEnv = <T extends z.ZodType>(schema: T) =>
  z.preprocess(emptyStringToUndefined, schema.optional());

export const envUrl = z
  .string()
  .trim()
  .min(1, "is required")
  .refine(validUrl, "must be a valid URL");

export const optionalUrl = optionalEnv(envUrl);

export const optionalEmail = optionalEnv(z.string().trim().email("must be a valid email address"));

export const optionalPhoneNumber = optionalEnv(
  z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, "must be a valid E.164 phone number"),
);

export const optionalSecret = optionalEnv(z.string().trim().min(1, "cannot be empty"));

const formatPath = (path: PropertyKey[]) => path.join(".");

export function formatEnvErrors(error: z.ZodError, label: string) {
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? formatPath(issue.path) : "value";
    return `- ${path}: ${issue.message}`;
  });

  return [`Invalid ${label} environment variables:`, ...issues].join("\n");
}
