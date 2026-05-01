import Image from "next/image";
import { Button } from "@/components/ui/button";

const marqueeItems = [
  "Sunday May 24",
  "Crawfish boil",
  "Pool is open",
  "Live music",
  "Cold drinks",
  "Good times",
];

const scheduleItems = [
  {
    time: "12 PM",
    label: "Pool opens",
  },
  {
    time: "1 PM",
    label: "Boil hits the table",
  },
  {
    time: "2:30 PM",
    label: "Live music kicks off",
  },
];

const ticketNotes = [
  {
    label: "Tickets",
    title: "Quick entry",
    copy: "Simple choices, clear details, and a checkout path that keeps the party moving.",
  },
  {
    label: "Merch",
    title: "Event gear",
    copy: "Shirts and extras should feel like part of the poster world, not a separate shop.",
  },
  {
    label: "Lineup",
    title: "Live sets",
    copy: "Music belongs in the main event mix with the boil, the water, and the people.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#ffd447] text-[#102344]">
      <section className="relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden border-b-[10px] border-[#102344]">
        <Image
          src="/generated-art/bubelpalooza-hero.png"
          alt="Illustrated Bubelpalooza scene with crawfish, poolside party details, string lights, palms, and a live music stage."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#ffd447]/10" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-7xl flex-col justify-between px-5 pb-8 pt-8 sm:px-8 lg:px-10">
          <div className="flex flex-wrap gap-2">
            <span className="sign-chip bg-[#102344] text-[#ffd447]">
              Sunday, May 24, 2026
            </span>
            <span className="sign-chip bg-white text-[#102344]">
              Leander, TX
            </span>
            <span className="sign-chip bg-[#e6392e] text-white">
              Bubel Beach Club
            </span>
            <span className="sign-chip bg-[#2ec4f3] text-[#102344]">
              Crawfish boil
            </span>
            <span className="sign-chip bg-white text-[#102344]">
              Pool party
            </span>
            <span className="sign-chip bg-[#f97316] text-white">
              Live music
            </span>
          </div>

          <div className="max-w-5xl py-10 sm:py-14">
            <p className="mb-3 inline-block bg-[#102344] px-4 py-2 text-sm font-black uppercase text-[#ffd447]">
              Good food / cold drinks / good times
            </p>
            <h1
              data-poster="true"
              className="headline-stack text-[2.875rem] leading-[0.86] text-[#e6392e] min-[380px]:text-6xl sm:text-8xl lg:text-[9rem]"
            >
              BUBELPALOOZA
            </h1>
            <p className="mt-5 max-w-2xl border-l-8 border-[#e6392e] bg-[#fff7e6]/92 px-5 py-4 text-lg font-bold leading-8 shadow-[10px_10px_0_#102344]">
              Sunday, May 24, 2026 at Bubel Beach Club in Leander, TX. A
              sun-soaked crawfish boil, pool party, live music hang, and
              beach-club good time built to feel loud, local, and loved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[auto_auto_1fr] sm:items-end">
              <Button
                asChild
                size="lg"
                className="h-auto rounded-none border-4 border-[#102344] bg-[#e6392e] px-7 py-4 text-base font-black uppercase text-white shadow-[6px_6px_0_#102344] hover:bg-[#cf2f24]"
              >
                <a href="#tickets">Tickets coming soon</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto rounded-none border-4 border-[#102344] bg-[#fff7e6] px-7 py-4 text-base font-black uppercase text-[#102344] shadow-[6px_6px_0_#102344] hover:bg-white"
              >
                <a href="#day-schedule">See the schedule</a>
              </Button>
              <p className="max-w-sm bg-[#2ec4f3] px-4 py-3 text-sm font-black uppercase text-[#102344] shadow-[6px_6px_0_#102344] sm:justify-self-end">
                Bubel Beach Club / crawfish / pool / bands / merch
              </p>
            </div>

            <div
              id="day-schedule"
              className="grid gap-3 border-4 border-[#102344] bg-[#fff7e6] p-3 shadow-[8px_8px_0_#102344] sm:grid-cols-3"
            >
              {scheduleItems.map((item) => (
                <div
                  key={item.label}
                  className="border-2 border-[#102344] bg-[#ffd447] px-4 py-3"
                >
                  <p
                    data-poster="true"
                    className="text-4xl leading-none text-[#e6392e]"
                  >
                    {item.time}
                  </p>
                  <p className="mt-1 text-sm font-black uppercase text-[#102344]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Event highlights"
        className="border-b-[10px] border-[#102344] bg-[#102344] py-4 text-[#fff7e6]"
      >
        <div className="marquee-row">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} data-poster="true">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="relative overflow-hidden border-b-[10px] border-[#102344] bg-[#ffd447] px-5 py-14 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="inline-block bg-[#2ec4f3] px-4 py-2 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344]">
              The whole day
            </p>
            <h2
              data-poster="true"
              className="mt-5 max-w-3xl text-5xl leading-[0.92] text-[#102344] sm:text-7xl"
            >
              SAVE THE DATE. SHOW UP HUNGRY.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-[#24344d]">
              The site should feel like the event poster came alive: sharp
              ribbons, loud color, tropical movement, crawfish boil warmth,
              poolside brightness, and music running straight through it. More
              ticket, merch, menu, and lineup details are coming soon.
            </p>
          </div>

          <div className="relative aspect-[1774/887] overflow-hidden border-4 border-[#102344] bg-[#fff7e6] shadow-[14px_14px_0_#102344]">
            <Image
              src="/generated-art/bubelpalooza-poster-panel.png"
              alt="Original illustrated Bubelpalooza poster panel with crawfish, ticket stubs, merch, pool water, live music stage, and overlaid event details."
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 text-center font-black uppercase [text-shadow:1px_1px_0_rgba(255,247,230,0.78)]">
              <div className="absolute left-[22%] top-[12.5%] flex h-[18%] w-[48%] rotate-[1deg] flex-col items-center justify-center text-[#102344]">
                <p
                  data-poster="true"
                  className="text-[clamp(1rem,4.1vw,3rem)] leading-[0.86]"
                >
                  Sun May 24
                </p>
                <p className="mt-1 text-[clamp(0.38rem,1.18vw,0.82rem)] leading-none">
                  Bubel Beach Club / Leander, TX
                </p>
              </div>

              <div className="absolute left-[25.5%] top-[45.5%] flex h-[12%] w-[18%] -rotate-[5deg] flex-col items-center justify-center text-[#fff7e6] [text-shadow:2px_2px_0_rgba(16,35,68,0.78)]">
                <p
                  data-poster="true"
                  className="text-[clamp(0.72rem,2.55vw,1.85rem)] leading-[0.86]"
                >
                  12 PM
                </p>
                <p className="text-[clamp(0.32rem,0.88vw,0.62rem)] leading-none">
                  Pool opens
                </p>
              </div>

              <div className="absolute left-[58%] top-[45.5%] flex h-[12%] w-[18%] rotate-[6deg] flex-col items-center justify-center text-[#fff7e6] [text-shadow:2px_2px_0_rgba(16,35,68,0.72)]">
                <p
                  data-poster="true"
                  className="text-[clamp(0.72rem,2.55vw,1.85rem)] leading-[0.86]"
                >
                  1 PM
                </p>
                <p className="text-[clamp(0.32rem,0.88vw,0.62rem)] leading-none">
                  Boil hits
                </p>
              </div>

              <div className="absolute left-[31.5%] top-[63.5%] flex h-[12%] w-[31%] -rotate-[3deg] flex-col items-center justify-center text-[#102344]">
                <p
                  data-poster="true"
                  className="text-[clamp(0.78rem,2.7vw,1.95rem)] leading-[0.86]"
                >
                  2:30 PM
                </p>
                <p className="text-[clamp(0.32rem,0.88vw,0.62rem)] leading-none">
                  Music kicks off
                </p>
              </div>
            </div>
          </div>

          <dl className="grid gap-2 border-4 border-[#102344] bg-[#fff7e6] p-3 text-[#102344] shadow-[8px_8px_0_#102344] sm:hidden">
            {scheduleItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 border-2 border-[#102344] bg-[#ffd447] px-3 py-2"
              >
                <dt className="text-sm font-black uppercase">{item.label}</dt>
                <dd data-poster="true" className="text-3xl leading-none text-[#e6392e]">
                  {item.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="tickets"
        className="bg-[#fff7e6] px-5 py-14 text-[#102344] sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="inline-block bg-[#e6392e] px-4 py-2 text-sm font-black uppercase text-white shadow-[5px_5px_0_#102344]">
                Tickets + merch
              </p>
              <h2
                data-poster="true"
                className="mt-5 text-5xl leading-[0.9] text-[#e6392e] sm:text-7xl"
              >
                BUY THE PASS. WEAR THE SHIRT. HIT THE POOL.
              </h2>
            </div>
            <p className="max-w-2xl border-t-8 border-[#2ec4f3] pt-5 text-lg font-semibold leading-8 text-[#344760]">
              Ticketing should be obvious, merchandise should feel collectible,
              and every purchase touchpoint should still look like
              Bubelpalooza. Tickets and merch are coming soon.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {ticketNotes.map((note) => (
              <article
                key={note.label}
                className="ticket-panel border-4 border-[#102344] bg-[#ffd447] p-5 shadow-[10px_10px_0_#102344]"
              >
                <p className="inline-block bg-[#102344] px-3 py-1 text-xs font-black uppercase text-[#ffd447]">
                  {note.label}
                </p>
                <h3
                  data-poster="true"
                  className="mt-5 text-4xl leading-[0.9] text-[#102344]"
                >
                  {note.title}
                </h3>
                <p className="mt-4 text-base font-semibold leading-7 text-[#344760]">
                  {note.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lineup"
        className="border-y-[10px] border-[#102344] bg-[#e6392e] px-5 py-14 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="inline-block bg-[#ffd447] px-4 py-2 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344]">
              Live music
            </p>
            <h2
              data-poster="true"
              className="mt-5 text-5xl leading-[0.9] sm:text-7xl"
            >
              THE LINEUP BELONGS ON THE POSTER.
            </h2>
          </div>
          <div className="border-4 border-[#102344] bg-[#fff7e6] p-5 text-[#102344] shadow-[12px_12px_0_#102344]">
            <p className="text-lg font-black leading-8">
              Live sets should feel as present as the boil and the pool:
              celebratory, visible, and built into the rhythm of the day. Music
              kicks off at 2:30 PM.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm font-black uppercase sm:grid-cols-4">
              {marqueeItems.slice(0, 4).map((item) => (
                <span key={item} className="bg-[#2ec4f3] px-3 py-3">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="beach-club"
        className="bg-[#ffd447] px-5 py-14 text-[#102344] sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <h2
            data-poster="true"
            className="max-w-4xl text-5xl leading-[0.9] sm:text-7xl"
          >
            BUBEL BEACH CLUB IS THE DESTINATION.
          </h2>
          <div className="border-l-8 border-[#e6392e] bg-[#fff7e6] p-6 text-lg font-semibold leading-8 shadow-[10px_10px_0_#102344]">
            <p>
              Sunday, May 24, 2026 in Leander, TX. Sunshine, water, crawfish,
              cold drinks, merch, and live music all get the same visual
              confidence while fuller event details are still on the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
