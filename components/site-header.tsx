import Link from "next/link";
import { EventUpdatesTrigger } from "@/components/event-updates-trigger";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#102344] bg-[#ffd447] text-[#102344]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-stretch gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          className="grid border-4 border-[#102344] bg-[#e6392e] text-white shadow-[5px_5px_0_#102344]"
          aria-label="Bubelpalooza home"
        >
          <span
            data-poster="true"
            className="px-3 py-2 text-3xl leading-none sm:text-4xl"
          >
            BUBELPALOOZA
          </span>
          <span className="border-t-4 border-[#102344] bg-[#fff7e6] px-3 py-1 text-xs font-black uppercase text-[#102344]">
            May 24 / Leander, TX
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-2 lg:flex">
          {[
            ["Experience", "#experience"],
            ["Schedule", "#day-schedule"],
            ["Tickets", "#tickets"],
            ["Lineup", "#lineup"],
            ["Beach Club", "#beach-club"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="border-2 border-[#102344] bg-[#fff7e6] px-3 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#102344] hover:bg-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <EventUpdatesTrigger />
      </div>
    </header>
  );
}
