import {
  getCartTotals,
  getPassPriceCents,
  ticketCartSchema,
  type TicketCart,
  type TicketCartInput,
} from "@/lib/tickets/cart";
import type {
  KoozieSelection,
  PackageId,
  ShirtSelection,
} from "@/lib/merch/catalog";

export type TicketOrderPassSnapshot = {
  passNumber: number;
  packageId: PackageId;
  priceCents: number;
  nameYourPriceCents: number;
  shirtSelection: ShirtSelection | null;
  koozieSelection: KoozieSelection | null;
};

export type TicketOrderSnapshot = {
  passes: TicketOrderPassSnapshot[];
  passSubtotalCents: number;
  donationCents: number;
  totalCents: number;
};

export function createTicketOrderSnapshot(
  cartInput: TicketCartInput | TicketCart,
): TicketOrderSnapshot {
  const cart = ticketCartSchema.parse(cartInput);
  const totals = getCartTotals(cart);

  return {
    ...totals,
    passes: cart.passes.map((pass, index) => {
      const priceCents = getPassPriceCents(pass);

      return {
        passNumber: index + 1,
        packageId: pass.packageId,
        priceCents,
        nameYourPriceCents:
          pass.packageId === "name-your-price" ? priceCents : 0,
        shirtSelection: pass.shirtSelection ?? null,
        koozieSelection: pass.koozieSelection ?? null,
      };
    }),
  };
}
