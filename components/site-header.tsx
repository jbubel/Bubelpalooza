import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-700">
            Bubelpalooza
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Crawfish boil, pool party, and mini music showcase
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="hidden bg-white/80 sm:inline-flex"
        >
          Summer gathering
        </Button>
      </div>
    </header>
  );
}
