export default function Home() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-black/5 bg-white/90 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
          Bubelpalooza
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          The shared site shell is ready for the event experience.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          The app now has a reusable header, footer, and baseline metadata layer
          to support the public event site as it grows.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Shared layout in place
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Future pages can now plug into a consistent shell instead of
              re-creating top-level structure one route at a time.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Next suggested step
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Build the real homepage and supporting event-information pages on
              top of this shell.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
