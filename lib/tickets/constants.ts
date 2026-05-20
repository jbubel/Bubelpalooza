export const MAX_PASSES_PER_ORDER = 6;
export const TICKET_CART_STORAGE_KEY = "bubelpalooza-ticket-cart";

export const SHIRT_STYLE_VALUES = ["tee", "tank"] as const;
export const SHIRT_COLOR_VALUES = ["black", "white"] as const;
export const SHIRT_SIZE_VALUES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export const KOOZIE_TYPE_VALUES = ["slim-tall", "standard-short"] as const;
export const PACKAGE_VALUES = [
  "ultimate",
  "koozie",
  "sticker",
  "name-your-price",
] as const;

export type ShirtStyle = (typeof SHIRT_STYLE_VALUES)[number];
export type ShirtColor = (typeof SHIRT_COLOR_VALUES)[number];
export type ShirtSize = (typeof SHIRT_SIZE_VALUES)[number];
export type KoozieType = (typeof KOOZIE_TYPE_VALUES)[number];
export type PackageId = (typeof PACKAGE_VALUES)[number];
