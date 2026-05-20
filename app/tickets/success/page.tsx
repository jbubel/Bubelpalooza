import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClearTicketCart } from "@/app/tickets/success/clear-ticket-cart";

export const metadata: Metadata = {
  title: "Order Received",
  description:
    "Bubelpalooza order confirmation page with next steps for event-day check-in.",
};

export default function TicketsSuccessPage() {
  return (
    <div className="bg-[#ffd447] px-5 py-12 text-[#102344] sm:px-8 sm:py-16 lg:px-10">
      <ClearTicketCart />
      <section className="mx-auto max-w-4xl border-4 border-[#102344] bg-[#fff7e6] p-6 shadow-[10px_10px_0_#102344] sm:p-8">
        <p className="inline-flex items-center gap-2 bg-[#102344] px-4 py-2 text-sm font-black uppercase text-[#ffd447]">
          <CheckCircle2 className="size-5" />
          Order received
        </p>
        <h1
          data-poster="true"
          className="mt-5 text-5xl leading-[0.9] text-[#e6392e] sm:text-7xl"
        >
          YOU ARE ON THE LIST.
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-[#344760]">
          Thanks for grabbing Bubelpalooza passes. Keep an eye on your inbox for
          payment confirmation from Stripe, and plan to pick up merch at
          check-in on Sunday, May 24.
        </p>
        <div className="mt-7 grid gap-3 border-y-4 border-[#102344] py-5 sm:grid-cols-3">
          {[
            ["12 PM", "Pool opens"],
            ["1 PM", "Boil hits the table"],
            ["2:30 PM", "Live music kicks off"],
          ].map(([time, label]) => (
            <div key={label} className="bg-[#ffd447] p-4 text-center">
              <p data-poster="true" className="text-4xl leading-none text-[#e6392e]">
                {time}
              </p>
              <p className="mt-1 text-sm font-black uppercase text-[#102344]">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-auto rounded-none border-4 border-[#102344] bg-[#e6392e] px-6 py-3 text-sm font-black uppercase text-white shadow-[5px_5px_0_#102344] hover:bg-[#cf2f24]"
          >
            <Link href="/">Back to event info</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-none border-4 border-[#102344] bg-[#fff1c7] px-6 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-white"
          >
            <Link href="/merch">Review merch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
