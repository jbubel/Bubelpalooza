import { z } from "zod";
import {
  KOOZIE_TYPE_VALUES,
  PACKAGE_VALUES,
  SHIRT_COLOR_VALUES,
  SHIRT_SIZE_VALUES,
  SHIRT_STYLE_VALUES,
  koozieSelectionSchema,
  packageRequiresMerch,
  packageSchema,
  shirtSelectionSchema,
  ticketPackages,
  type KoozieSelection,
  type KoozieType,
  type PackageId,
  type ShirtColor,
  type ShirtSelection,
  type ShirtSize,
  type ShirtStyle,
  type TicketPackage,
} from "@/lib/merch/catalog";

export const MAX_PASSES_PER_ORDER = 6;
export const TICKET_CART_STORAGE_KEY = "bubelpalooza-ticket-cart";

export const centsSchema = z
  .number()
  .int("must be a whole number of cents")
  .min(0, "must be zero or more")
  .max(100_000, "must be $1,000 or less");

export const ticketCartPassSchema = z
  .object({
    packageId: packageSchema,
    nameYourPriceCents: centsSchema.optional().default(0),
    shirtSelection: shirtSelectionSchema.optional(),
    koozieSelection: koozieSelectionSchema.optional(),
  })
  .superRefine((pass, context) => {
    const requirements = packageRequiresMerch(pass.packageId);

    if (pass.packageId !== "name-your-price" && pass.nameYourPriceCents > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["nameYourPriceCents"],
        message: "is only available for name-your-price passes",
      });
    }

    if (requirements.shirt && !pass.shirtSelection) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["shirtSelection"],
        message: "is required for this package",
      });
    }

    if (!requirements.shirt && pass.shirtSelection) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["shirtSelection"],
        message: "is not available for this package",
      });
    }

    if (requirements.koozie && !pass.koozieSelection) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["koozieSelection"],
        message: "is required for this package",
      });
    }

    if (!requirements.koozie && pass.koozieSelection) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["koozieSelection"],
        message: "is not available for this package",
      });
    }
  });

export const ticketCartSchema = z.object({
  passes: z
    .array(ticketCartPassSchema)
    .min(1, "Add at least one pass")
    .max(MAX_PASSES_PER_ORDER, `Orders can include up to ${MAX_PASSES_PER_ORDER} passes`),
  donationCents: centsSchema.optional().default(0),
});

export const ticketWizardStoredPassSchema = z.object({
  id: z.string().min(1),
  packageId: z.enum(PACKAGE_VALUES),
  nameYourPriceDollars: z.string(),
  shirtStyle: z.union([z.enum(SHIRT_STYLE_VALUES), z.literal("")]),
  shirtColor: z.union([z.enum(SHIRT_COLOR_VALUES), z.literal("")]),
  shirtSize: z.union([z.enum(SHIRT_SIZE_VALUES), z.literal("")]),
  koozieType: z.union([z.enum(KOOZIE_TYPE_VALUES), z.literal("")]),
});

export const ticketWizardStorageSchema = z.object({
  passes: z
    .array(ticketWizardStoredPassSchema)
    .min(1)
    .max(MAX_PASSES_PER_ORDER),
  donationDollars: z.string(),
});

export type TicketCartPassInput = z.input<typeof ticketCartPassSchema>;
export type TicketCartInput = z.input<typeof ticketCartSchema>;
export type TicketCartPass = z.output<typeof ticketCartPassSchema>;
export type TicketCart = z.output<typeof ticketCartSchema>;
export type TicketWizardStoredPass = z.infer<typeof ticketWizardStoredPassSchema>;
export type TicketWizardStorage = z.infer<typeof ticketWizardStorageSchema>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function getTicketPackage(packageId: PackageId): TicketPackage {
  const selectedPackage = ticketPackages.find(
    (ticketPackage) => ticketPackage.id === packageId,
  );

  if (!selectedPackage) {
    throw new Error(`Ticket package ${packageId} is not configured.`);
  }

  return selectedPackage;
}

export function formatCents(cents: number) {
  return currencyFormatter.format(cents / 100);
}

export function dollarsToCents(value: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return Math.round(parsed * 100);
}

export function getPassPriceCents(pass: TicketCartPass) {
  const selectedPackage = getTicketPackage(pass.packageId);

  return selectedPackage.priceCents ?? pass.nameYourPriceCents;
}

export function getCartTotals(cart: TicketCart) {
  const passSubtotalCents = cart.passes.reduce(
    (sum, pass) => sum + getPassPriceCents(pass),
    0,
  );
  const totalCents = passSubtotalCents + cart.donationCents;

  return {
    passSubtotalCents,
    donationCents: cart.donationCents,
    totalCents,
  };
}

export function describeShirtSelection(selection: ShirtSelection) {
  return `${selection.color} ${selection.style}, size ${selection.size}`;
}

export function describeKoozieSelection(selection: KoozieSelection) {
  return selection.type === "slim-tall" ? "slim/tall koozie" : "standard/short koozie";
}

export function describePassSelection(pass: TicketCartPass) {
  const selectedPackage = getTicketPackage(pass.packageId);
  const details = [selectedPackage.description];

  if (pass.shirtSelection) {
    details.push(`Shirt: ${describeShirtSelection(pass.shirtSelection)}.`);
  }

  if (pass.koozieSelection) {
    details.push(`Koozie: ${describeKoozieSelection(pass.koozieSelection)}.`);
  }

  if (pass.packageId === "name-your-price") {
    details.push(`Pass contribution: ${formatCents(pass.nameYourPriceCents)}.`);
  }

  return details.join(" ");
}

export type TicketWizardPass = {
  id: string;
  packageId: PackageId;
  nameYourPriceDollars: string;
  shirtStyle: ShirtStyle | "";
  shirtColor: ShirtColor | "";
  shirtSize: ShirtSize | "";
  koozieType: KoozieType | "";
};
