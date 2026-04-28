import Image from "next/image";
import { Button } from "@/components/ui/button";

const signwords = [
  { label: "Sunshine", color: "bg-[#2ec4f3]", text: "text-[#173257]" },
  { label: "Good Times", color: "bg-[#e6392e]", text: "text-[#fff7e6]" },
  { label: "Cold Drinks", color: "bg-[#2ec4f3]", text: "text-[#173257]" },
  { label: "Live Music", color: "bg-[#f97316]", text: "text-[#fff7e6]" },
];

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <section className="space-y-5">
          <div className="poster-shadow overflow-hidden rounded-[2.6rem] border-2 border-[#173257]/18 bg-[#fff7e6]">
            <Image
              src="/event-art/bubel-wood-banner.jpg"
              alt="Bubelpalooza event artwork with a crawfish boil, pool, palms, and summer party graphics."
              width={1924}
              height={909}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="poster-shadow rounded-[2.25rem] border-2 border-[#173257]/15 bg-[#fff7e6] px-6 py-8 text-[#173257] sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e6392e]">
                Bubel Beach Club
              </p>
              <h1
                data-poster="true"
                className="mt-4 max-w-3xl text-5xl leading-[0.88] tracking-[0.02em] sm:text-6xl"
              >
                CRAWFISH. POOLSIDE. LIVE MUSIC. GOOD TIMES YEAR AFTER YEAR.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#344760]">
                Bubelpalooza brings the boil, the pool, the music, the drinks,
                and the summer-party feel together in one place. It should feel
                fun before it feels polished and memorable before it feels tidy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border-0 bg-[#e6392e] px-7 text-base text-[#fff7e6] hover:bg-[#cf2f24]"
                >
                  <a href="#tickets">Tickets coming soon</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#173257]/20 bg-white px-7 text-base text-[#173257] hover:bg-[#fff7e6]"
                >
                  <a href="#experience">See the experience</a>
                </Button>
              </div>
            </div>

            <div className="poster-shadow overflow-hidden rounded-[2.25rem] border-2 border-[#173257]/15 bg-[#fff7e6]">
              <Image
                src="/event-art/bubel-signpost.jpg"
                alt="Bubelpalooza design detail showing tropical signpost graphics including sunshine, good times, cold drinks, and live music."
                width={1152}
                height={2048}
                className="h-full max-h-[28rem] w-full object-cover object-bottom"
              />
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="grid gap-3 md:grid-cols-4"
        >
          {signwords.map((item) => (
            <div
              key={item.label}
              className={`poster-shadow rounded-[1.6rem] border-2 border-[#173257]/15 px-5 py-5 ${item.color} ${item.text}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                Event energy
              </p>
              <p data-poster="true" className="mt-3 text-3xl leading-[0.92]">
                {item.label}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            id="tickets"
            className="poster-shadow rounded-[2.25rem] border-2 border-[#173257]/15 bg-[#fff7e6] px-6 py-8 text-[#173257] sm:px-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e6392e]">
              Tickets
            </p>
            <h2
              data-poster="true"
              className="mt-4 text-5xl leading-[0.9] tracking-[0.02em]"
            >
              TICKETS SHOULD FEEL AS EASY AS THE PARTY.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#344760]">
              Clear options, obvious calls to action, and a checkout experience
              that feels trustworthy without losing the event personality.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border-2 border-[#e6392e]/20 bg-[#ffd447] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#e6392e]">
                  Quick
                </p>
                <p className="mt-2 text-sm">
                  Guests should know where to click immediately.
                </p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-[#2ec4f3]/25 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#1d4ed8]">
                  Clear
                </p>
                <p className="mt-2 text-sm">
                  Ticket types and details should read at a glance.
                </p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-[#173257]/15 bg-[#fff1c7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#f97316]">
                  Ready
                </p>
                <p className="mt-2 text-sm">
                  Follow-up info should make guests feel set for the day.
                </p>
              </div>
            </div>
          </div>

          <div
            id="lineup"
            className="poster-shadow rounded-[2.25rem] border-2 border-[#173257]/15 bg-[#173257] px-6 py-8 text-[#fff7e6] sm:px-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2ec4f3]">
              Live music
            </p>
            <h2
              data-poster="true"
              className="mt-4 text-5xl leading-[0.9] tracking-[0.02em]"
            >
              MUSIC IS PART OF THE MAIN EVENT ENERGY.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#f7dfa5]">
              The lineup should carry the same celebratory weight as the boil
              and the pool. It belongs in the headline mix and should feel
              lively, visible, and woven through the day from the first scroll.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="sticker rounded-full bg-[#e6392e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Live music
              </span>
              <span className="sticker rounded-full bg-[#2ec4f3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#173257]">
                Pool party
              </span>
              <span className="sticker rounded-full bg-[#ffd447] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#173257]">
                Crawfish boil
              </span>
            </div>
          </div>
        </section>

        <section
          id="beach-club"
          className="poster-shadow rounded-[2.25rem] border-2 border-[#173257]/15 bg-[#fff7e6] px-6 py-8 text-[#173257] sm:px-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4ed8]">
            Bubel Beach Club
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <h2
              data-poster="true"
              className="text-5xl leading-[0.9] tracking-[0.02em]"
            >
              GOOD FOOD. COLD DRINKS. GOOD TIMES.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[#344760]">
              The page should feel like the event graphics came to life: tropical,
              bright, playful, a little rustic, and clearly made for a real day
              of crawfish, poolside fun, and live music at Bubel Beach Club.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border-2 border-[#173257]/12 bg-white">
            <Image
              src="/event-art/bubel-banner.jpg"
              alt="Bubelpalooza illustrated banner artwork featuring a crawfish boil, pool, tropical plants, and celebratory signage."
              width={2048}
              height={825}
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
