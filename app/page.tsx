import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <section className="poster-shadow poster-panel overflow-hidden rounded-[2.5rem] border border-[#172033]/20">
          <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#172033]">
                <span className="sticker rounded-full bg-[#e6392e] px-4 py-2 text-white">
                  Bubel Beach Club
                </span>
                <span className="sticker rounded-full bg-[#2ec4f3] px-4 py-2 text-[#101827]">
                  Crawfish boil
                </span>
                <span className="sticker rounded-full bg-[#fff7e6] px-4 py-2 text-[#172033]">
                  Pool party + live music
                </span>
              </div>

              <div className="mt-8 space-y-2">
                <p
                  data-poster="true"
                  className="headline-outline text-6xl leading-[0.84] tracking-[0.01em] text-[#e6392e] sm:text-8xl"
                >
                  BUBELPALOOZA
                </p>
                <p
                  data-poster="true"
                  className="headline-outline text-6xl leading-[0.84] tracking-[0.01em] text-white sm:text-8xl"
                >
                  BUBELPALOOZA
                </p>
                <p
                  data-poster="true"
                  className="headline-outline text-6xl leading-[0.84] tracking-[0.01em] text-[#2ec4f3] sm:text-8xl"
                >
                  BUBELPALOOZA
                </p>
              </div>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#24344d]">
                A bold, backyard beach-club festival with crawfish, sunshine,
                water, community, and a live-music pulse running through the
                whole day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border-0 bg-[#e6392e] px-7 text-base text-[#fff7e6] hover:bg-[#cf2f24]"
                >
                  <a href="#tickets">Buy tickets soon</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#172033]/20 bg-white px-7 text-base text-[#172033] hover:bg-[#fff7e6]"
                >
                  <a href="#lineup">See event details</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[2rem] border-2 border-[#172033] bg-[#101827] p-6 text-[#fff7e6]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd447]">
                  The vibe
                </p>
                <p
                  data-poster="true"
                  className="mt-4 text-4xl leading-[0.9] tracking-[0.03em] text-[#fff7e6]"
                >
                  HOT BOIL.
                  <br />
                  COOL WATER.
                  <br />
                  BIG ENERGY.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[1.75rem] border-2 border-[#172033]/15 bg-[#fff7e6] px-5 py-5 text-[#172033]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e6392e]">
                    Food
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    Crawfish front and center, built to gather people around the table.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border-2 border-[#172033]/15 bg-[#fff7e6] px-5 py-5 text-[#172033]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2ec4f3]">
                    Water
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    Poolside atmosphere that makes the whole day feel loose and summery.
                  </p>
                </div>
                <div id="lineup" className="rounded-[1.75rem] border-2 border-[#172033]/15 bg-[#fff7e6] px-5 py-5 text-[#172033]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                    Music
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    A mini showcase that keeps the event buzzing without taking over the whole story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            id="tickets"
            className="poster-shadow rounded-[2.25rem] border-2 border-[#172033]/18 bg-[#fff7e6] px-6 py-8 text-[#172033] sm:px-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e6392e]">
              Ticket path
            </p>
            <h2
              data-poster="true"
              className="mt-4 text-5xl leading-[0.9] tracking-[0.02em]"
            >
              TICKETS SHOULD HIT FAST AND CLEAR.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#344760]">
              No clutter, no confusion. Just obvious options, strong calls to
              action, and a clean path into the event.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border-2 border-[#e6392e]/20 bg-[#ffd447] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#e6392e]">
                  Simple
                </p>
                <p className="mt-2 text-sm">Quick purchase flow with easy-to-read choices.</p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-[#2ec4f3]/25 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#1d4ed8]">
                  Trusted
                </p>
                <p className="mt-2 text-sm">Clear details and a checkout experience guests can trust.</p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-[#172033]/15 bg-[#fff1c7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#f97316]">
                  Ready
                </p>
                <p className="mt-2 text-sm">Follow-up info that helps people feel event-day ready.</p>
              </div>
            </div>
          </div>

          <div className="poster-shadow rounded-[2.25rem] border-2 border-[#172033]/18 bg-[#101827] px-6 py-8 text-[#fff7e6] sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2ec4f3]">
              Merch + mood
            </p>
            <h2
              data-poster="true"
              className="mt-4 text-5xl leading-[0.9] tracking-[0.02em]"
            >
              THE SITE SHOULD FEEL LIKE THE POSTER.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#f7dfa5]">
              Merch, ticket stubs, flyer blocks, bold type, loud colors. The
              site should feel graphic and memorable before it feels polished.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="sticker rounded-full bg-[#e6392e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Family friendly
              </span>
              <span className="sticker rounded-full bg-[#2ec4f3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#101827]">
                Live music
              </span>
              <span className="sticker rounded-full bg-[#ffd447] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#172033]">
                Limited tickets
              </span>
            </div>
          </div>
        </section>

        <section className="poster-shadow rounded-[2.25rem] border-2 border-[#172033]/18 bg-[#fff7e6] px-6 py-8 text-[#172033] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4ed8]">
            Bubel Beach Club
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <h2
              data-poster="true"
              className="text-5xl leading-[0.9] tracking-[0.02em]"
            >
              YELLOW, LOUD, SUMMER, WELCOMING.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[#344760]">
              Bubelpalooza should feel like a bold local festival flyer that got
              turned into a ticketing site without losing its personality. Big
              name. Big color. Big vibe. Crawfish, poolside fun, and live music
              all visible at once.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
