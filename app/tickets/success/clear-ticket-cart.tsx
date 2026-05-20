"use client";

import { useEffect } from "react";
import { TICKET_CART_STORAGE_KEY } from "@/lib/tickets/cart";

export function ClearTicketCart() {
  useEffect(() => {
    window.localStorage.removeItem(TICKET_CART_STORAGE_KEY);
  }, []);

  return null;
}
