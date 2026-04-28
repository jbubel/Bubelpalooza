import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-[#101827]/15 bg-[#ffd447]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <div className="shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e6392e]">
            Bubelpalooza
          </p>
          <p className="mt-2 text-sm text-[#172033]">
            Bubel Beach Club / crawfish boil / pool party / live music
          </p>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#172033] lg:flex">
          <a href="#tickets">Tickets</a>
          <a href="#experience">Experience</a>
          <a href="#lineup">Lineup</a>
          <a href="#beach-club">Beach Club</a>
        </nav>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden rounded-full border-[#172033]/20 bg-[#fff7e6] px-4 text-[#172033] sm:inline-flex"
        >
          <a href="#tickets">Tickets soon</a>
        </Button>
      </div>
    </header>
  );
}
