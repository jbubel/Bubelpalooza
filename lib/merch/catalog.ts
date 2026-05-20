import { z } from "zod";
import {
  KOOZIE_TYPE_VALUES,
  PACKAGE_VALUES,
  SHIRT_COLOR_VALUES,
  SHIRT_SIZE_VALUES,
  SHIRT_STYLE_VALUES,
  type KoozieType,
  type PackageId,
  type ShirtColor,
  type ShirtSize,
  type ShirtStyle,
} from "@/lib/tickets/constants";

export {
  KOOZIE_TYPE_VALUES,
  PACKAGE_VALUES,
  SHIRT_COLOR_VALUES,
  SHIRT_SIZE_VALUES,
  SHIRT_STYLE_VALUES,
};
export type { KoozieType, PackageId, ShirtColor, ShirtSize, ShirtStyle };

export const MERCH_ASSETS = {
  lineup: "/merch/bubelpalooza-merch-lineup.png",
  lineupGreen: "/merch/bubelpalooza-merch-lineup-green.png",
  lineupCutout: "/merch/bubelpalooza-merch-lineup-cutout.png",
  blackTee: "/merch/bubelpalooza-black-tee.jpg",
  whiteTank: "/merch/bubelpalooza-white-tank.jpg",
  slimTallKoozie: "/merch/bubelpalooza-slim-tall-koozie.jpg",
  standardShortKoozie: "/merch/bubelpalooza-standard-short-koozie.jpg",
  sticker: "/merch/bubelpalooza-sticker.jpg",
} as const;

export const shirtStyleSchema = z.enum(SHIRT_STYLE_VALUES);
export const shirtColorSchema = z.enum(SHIRT_COLOR_VALUES);
export const shirtSizeSchema = z.enum(SHIRT_SIZE_VALUES);
export const koozieTypeSchema = z.enum(KOOZIE_TYPE_VALUES);
export const packageSchema = z.enum(PACKAGE_VALUES);

export const shirtSelectionSchema = z.object({
  style: shirtStyleSchema,
  color: shirtColorSchema,
  size: shirtSizeSchema,
});

export const koozieSelectionSchema = z.object({
  type: koozieTypeSchema,
});

export type ShirtSelection = z.infer<typeof shirtSelectionSchema>;
export type KoozieSelection = z.infer<typeof koozieSelectionSchema>;

export type Option<TValue extends string> = {
  value: TValue;
  label: string;
  description?: string;
};

export type TicketPackage = {
  id: PackageId;
  name: string;
  shortName: string;
  priceCents: number | null;
  priceLabel: string;
  description: string;
  includes: string[];
  requiresShirt: boolean;
  requiresKoozie: boolean;
  featured?: boolean;
  secondary?: boolean;
};

export type MerchProduct = {
  id: "shirt" | "koozie" | "sticker";
  name: string;
  eyebrow: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  options: string[];
};

export const shirtStyleOptions = [
  { value: "tee", label: "Tee" },
  { value: "tank", label: "Tank" },
] satisfies Option<ShirtStyle>[];

export const shirtColorOptions = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
] satisfies Option<ShirtColor>[];

export const shirtSizeOptions = SHIRT_SIZE_VALUES.map((size) => ({
  value: size,
  label: size,
})) satisfies Option<ShirtSize>[];

export const koozieTypeOptions = [
  {
    value: "slim-tall",
    label: "Slim / tall",
    description: "For taller cans.",
  },
  {
    value: "standard-short",
    label: "Standard / short",
    description: "For standard cans.",
  },
] satisfies Option<KoozieType>[];

export const ticketPackages = [
  {
    id: "ultimate",
    name: "Ultimate package",
    shortName: "Ultimate",
    priceCents: 2500,
    priceLabel: "$25",
    description: "Entry, food, sticker, koozie, and shirt.",
    includes: ["Entry + food", "Sticker", "Koozie", "Shirt"],
    requiresShirt: true,
    requiresKoozie: true,
    featured: true,
  },
  {
    id: "koozie",
    name: "Koozie+ package",
    shortName: "Koozie+",
    priceCents: 1500,
    priceLabel: "$15",
    description: "Entry, food, sticker, and koozie.",
    includes: ["Entry + food", "Sticker", "Koozie"],
    requiresShirt: false,
    requiresKoozie: true,
  },
  {
    id: "sticker",
    name: "Sticker+ package",
    shortName: "Sticker+",
    priceCents: 1000,
    priceLabel: "$10",
    description: "Entry, food, and sticker.",
    includes: ["Entry + food", "Sticker"],
    requiresShirt: false,
    requiresKoozie: false,
  },
  {
    id: "name-your-price",
    name: "Name your price",
    shortName: "Donation",
    priceCents: null,
    priceLabel: "$0+",
    description: "Entry and food, with no merch required.",
    includes: ["Entry + food"],
    requiresShirt: false,
    requiresKoozie: false,
    secondary: true,
  },
] satisfies TicketPackage[];

export const merchProducts = [
  {
    id: "shirt",
    name: "Event shirt",
    eyebrow: "Tee or tank",
    description:
      "Choose tee or tank, black or white, with sizes from S through 3XL.",
    image: {
      src: MERCH_ASSETS.blackTee,
      alt: "Black Bubelpalooza event tee rendering with crawfish and beach club artwork.",
    },
    options: ["Tee or tank", "Black or white", "S to 3XL"],
  },
  {
    id: "koozie",
    name: "Koozie",
    eyebrow: "Two fits",
    description: "Choose slim/tall or standard/short for event-day drinks.",
    image: {
      src: MERCH_ASSETS.standardShortKoozie,
      alt: "Standard short Bubelpalooza koozie rendering with crawfish artwork.",
    },
    options: ["Slim / tall", "Standard / short"],
  },
  {
    id: "sticker",
    name: "Sticker",
    eyebrow: "One design",
    description: "A single Bubelpalooza sticker design with the 2026 event art.",
    image: {
      src: MERCH_ASSETS.sticker,
      alt: "Bubelpalooza 2026 sticker rendering with crawfish, palms, sun, and wave artwork.",
    },
    options: ["One design"],
  },
] satisfies MerchProduct[];

export function packageRequiresMerch(packageId: PackageId) {
  const selectedPackage = ticketPackages.find((ticketPackage) => ticketPackage.id === packageId);

  return {
    shirt: selectedPackage?.requiresShirt ?? false,
    koozie: selectedPackage?.requiresKoozie ?? false,
  };
}
