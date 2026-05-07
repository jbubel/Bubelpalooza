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

export const emptyStringAsUndefined = <T extends z.ZodType>(schema: T) =>
  z.preprocess(emptyStringToUndefined, schema.optional());

export const envUrl = z
  .string()
  .trim()
  .min(1, "is required")
  .refine(validUrl, "must be a valid URL");

export const envUrlValue = emptyStringAsUndefined(envUrl);

export const envEmailValue = emptyStringAsUndefined(
  z.string().trim().email("must be a valid email address"),
);

const emailAddress = z.string().trim().email();

function extractSenderEmailAddress(value: string) {
  const senderMatch = value.trim().match(/^.+<([^<>]+)>$/);

  return senderMatch ? senderMatch[1].trim() : value.trim();
}

export const envSenderEmailValue = emptyStringAsUndefined(
  z
    .string()
    .trim()
    .min(1, "cannot be empty")
    .refine(
      (value) => emailAddress.safeParse(extractSenderEmailAddress(value)).success,
      "must be a valid email address or sender format like Name <email@example.com>",
    ),
);

export const envPhoneNumberValue = emptyStringAsUndefined(
  z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, "must be a valid E.164 phone number"),
);

export const envSecretValue = emptyStringAsUndefined(
  z.string().trim().min(1, "cannot be empty"),
);

export const envDomainValue = emptyStringAsUndefined(
  z
    .string()
    .trim()
    .min(1, "cannot be empty")
    .refine((value) => !value.includes("://"), "must be a domain without a protocol")
    .refine((value) => !value.includes("/"), "must not include a path"),
);

const formatPath = (path: PropertyKey[]) => path.join(".");

export function formatEnvErrors(error: z.ZodError, label: string) {
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? formatPath(issue.path) : "value";
    return `- ${path}: ${issue.message}`;
  });

  return [`Invalid ${label} environment variables:`, ...issues].join("\n");
}

export function toHttpsUrl(domain: string) {
  return `https://${domain}`;
}
