export function SiteFooter() {
  return (
    <footer className="border-t-4 border-[#102344] bg-[#102344] text-[#fff7e6]">
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-8 sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <p data-poster="true" className="text-4xl leading-none text-[#ffd447]">
          BUBELPALOOZA
        </p>
        <p className="max-w-2xl text-sm font-semibold leading-6 text-[#f7dfa5]">
          A public home for event info, ticketing, merchandise, crawfish,
          poolside energy, cold drinks, and live music at Bubel Beach Club.
        </p>
        <p className="bg-[#e6392e] px-4 py-2 text-sm font-black uppercase text-white">
          Good times year after year
        </p>
      </div>
    </footer>
  );
}
