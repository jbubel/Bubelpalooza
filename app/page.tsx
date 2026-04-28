export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff5e8,white_45%)] px-6 py-24 text-slate-950">
      <div className="w-full max-w-3xl rounded-3xl border border-black/5 bg-white/90 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
          Bubelpalooza
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Next.js foundation is in place.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          The App Router, TypeScript, Tailwind CSS, and ESLint baseline are now
          wired up and ready for the event site buildout.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
            <h2 className="text-base font-semibold text-slate-900">
              Foundation ready
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use this app as the starting point for the public event
              experience, ticketing flow, and future merchandise work.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold text-slate-900">
              Next suggested step
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Build the shared layout and metadata layer before adding the real
              homepage and supporting event pages.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
