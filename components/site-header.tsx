import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#101827]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ffd447]">
            Bubelpalooza
          </p>
          <p className="mt-2 text-sm text-[#f7dfa5]">
            Bubel Beach Club · crawfish boil · pool party · live music
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="sun-badge hidden rounded-full border-0 px-4 text-[#172033] sm:inline-flex"
        >
          Family-friendly summer festival
        </Button>
      </div>
    </header>
  );
}
