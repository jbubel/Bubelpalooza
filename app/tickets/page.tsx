import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TicketWizardLoader } from "@/app/tickets/ticket-wizard-loader";

export const metadata: Metadata = {
  title: "Tickets",
  description:
    "Build Bubelpalooza passes with package, shirt, koozie, sticker, and donation choices.",
};

export default function TicketsPage() {
  return (
    <div className="bg-[#ffd447] text-[#102344]">
      <section className="border-b-[10px] border-[#102344] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="inline-block border-4 border-[#102344] bg-[#2ec4f3] px-4 py-2 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344]">
                Tickets + merch
              </p>
              <h1
                data-poster="true"
                className="mt-5 max-w-4xl text-[3.6rem] leading-[0.86] text-[#e6392e] min-[430px]:text-7xl sm:text-8xl"
              >
                BUILD YOUR BUBELPALOOZA PASS.
              </h1>
            </div>
            <div className="border-l-8 border-[#e6392e] bg-[#fff7e6] p-5 text-[#102344] shadow-[8px_8px_0_#102344]">
              <p className="text-lg font-black leading-8">
                Start with the ultimate package for entry, food, shirt, koozie,
                and sticker, or choose a lighter pass for each guest.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-none border-4 border-[#102344] bg-[#fff1c7] px-5 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-white"
                >
                  <Link href="/merch">Preview merch</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-none border-4 border-[#102344] bg-[#ffd447] px-5 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-white"
                >
                  <Link href="/#day-schedule">See schedule</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <TicketWizardLoader />
        </div>
      </section>
    </div>
  );
}
