export const resendTemplateIds = {
  eventUpdatesWelcome: "9cc141fc-deba-49bb-895b-c2913c9c5e28",
} as const satisfies Record<string, string | null>;

export type ResendTemplateName = keyof typeof resendTemplateIds;
