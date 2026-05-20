import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CheckCircle2,
  MailCheck,
  MapPin,
  Music2,
  Shirt,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClearTicketCart } from "@/app/tickets/success/clear-ticket-cart";

export const metadata: Metadata = {
  title: "Tickets Confirmed",
  description:
    "Bubelpalooza ticket confirmation with event-day check-in and schedule details.",
};

const scheduleItems = [
  ["12 PM", "Pool opens"],
  ["1 PM", "Boil hits the table"],
  ["2:30 PM", "Live music kicks off"],
] as const;

const nextSteps: {
  title: string;
  copy: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Check your email",
    copy: "Keep an eye on the address used at checkout for your receipt and event-day details. If nothing lands right away, give it a few minutes and check spam.",
    icon: MailCheck,
  },
  {
    title: "Pick up merch at check-in",
    copy: "On event day, head to check-in when you arrive. Shirts, koozies, stickers, and event merch from your order are picked up there.",
    icon: Shirt,
  },
  {
    title: "Save the day",
    copy: "Bubelpalooza is Sunday, May 24, 2026 at Bubel Beach Club in Leander, TX.",
    icon: CalendarDays,
  },
];

const menuItems = [
  "Crawfish",
  "Shrimp",
  "Sausage",
  "Potatoes",
  "Mushrooms",
  "Corn",
  "Dirty rice",
] as const;

export default function TicketsSuccessPage() {
  return (
    <div className="bg-[#102344] px-5 py-10 text-[#102344] sm:px-8 sm:py-14 lg:px-10">
      <ClearTicketCart />
      <section className="mx-auto max-w-5xl overflow-hidden border-4 border-[#102344] bg-[#fff7e6] shadow-[10px_10px_0_#2ec4f3]">
        <div className="border-b-4 border-[#102344] bg-[#ffd447] px-5 py-5 sm:px-7">
          <p className="inline-flex items-center gap-2 bg-[#102344] px-4 py-2 text-sm font-black uppercase text-[#ffd447] shadow-[4px_4px_0_#e6392e]">
            <CheckCircle2 className="size-5" aria-hidden="true" />
            Checkout complete
          </p>
        </div>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
          <div>
            <h1
              data-poster="true"
              className="text-[3.35rem] leading-[0.86] text-[#e6392e] min-[430px]:text-6xl sm:text-7xl"
            >
              YOU ARE SET FOR BUBELPALOOZA.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-[#344760]">
              Thanks for grabbing passes. Keep an eye on the address used at
              checkout for your receipt and event-day details; that inbox is the
              best place to keep ticket info handy.
            </p>
            <p className="mt-4 max-w-2xl border-l-8 border-[#2ec4f3] bg-[#fff1c7] px-5 py-4 text-base font-black leading-7 text-[#102344]">
              When you arrive on Sunday, May 24, 2026, check in first. Any
              shirts, koozies, stickers, or event merch from your order will be
              ready for pickup there.
            </p>

            <div className="mt-7 grid gap-3">
              {nextSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="border-4 border-[#102344] bg-white p-4 shadow-[5px_5px_0_#102344]"
                  >
                    <div className="flex gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center bg-[#ffd447] text-[#102344]">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-sm font-black uppercase text-[#102344]">
                          {step.title}
                        </h2>
                        <p className="mt-1 text-sm font-semibold leading-6 text-[#344760]">
                          {step.copy}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
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
                <Link href="/merch">Preview merch</Link>
              </Button>
            </div>
          </div>

          <aside className="border-4 border-[#102344] bg-[#ffd447] p-5 shadow-[8px_8px_0_#102344]">
            <p className="inline-flex items-center gap-2 bg-[#102344] px-3 py-1 text-xs font-black uppercase text-[#ffd447]">
              <MapPin className="size-4" aria-hidden="true" />
              Bubel Beach Club / Leander, TX
            </p>
            <h2
              data-poster="true"
              className="mt-5 text-5xl leading-[0.9] text-[#102344] sm:text-6xl"
            >
              SUNDAY MAY 24
            </h2>

            <div className="mt-5 grid gap-3 border-y-4 border-[#102344] py-5">
              {scheduleItems.map(([time, label]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 bg-[#fff7e6] px-4 py-3"
                >
                  <p className="text-sm font-black uppercase text-[#102344]">
                    {label}
                  </p>
                  <p
                    data-poster="true"
                    className="shrink-0 text-3xl leading-none text-[#e6392e]"
                  >
                    {time}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-[#102344] p-4 text-[#fff7e6]">
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-[#ffd447]">
                <Music2 className="size-5" aria-hidden="true" />
                Live music is part of the day
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#f7dfa5]">
                Pool time, the boil, and live music all move together through
                the afternoon.
              </p>
            </div>

            <div className="mt-5 bg-[#fff7e6] p-4">
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-[#102344]">
                <Utensils className="size-5" aria-hidden="true" />
                Boil menu
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {menuItems.map((item) => (
                  <span
                    key={item}
                    className="bg-[#2ec4f3] px-3 py-1 text-xs font-black uppercase text-[#102344]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
