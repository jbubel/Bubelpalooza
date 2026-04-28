import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#d9a441]/45 bg-[#101827] shadow-[0_32px_100px_rgba(0,0,0,0.32)]">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_14%_16%,rgba(46,196,243,0.7),transparent_18%),radial-gradient(circle_at_86%_20%,rgba(247,37,133,0.55),transparent_18%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.06)_100%)]" />
          <div className="relative grid gap-0 lg:grid-cols-[1.45fr_0.55fr]">
            <div className="poster-panel px-8 py-10 sm:px-12 sm:py-14">
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#172033]">
                <span className="sticker rounded-full bg-[#e6392e] px-4 py-2 text-[#fff7e6]">
                  Bubelpalooza
                </span>
                <span className="sticker rounded-full bg-[#2ec4f3] px-4 py-2 text-[#101827]">
                  Bubel Beach Club
                </span>
                <span className="sticker rounded-full bg-[#fff7e6] px-4 py-2 text-[#172033]">
                  Backyard beach-party festival
                </span>
              </div>
              <h1
                data-poster="true"
                className="mt-8 max-w-4xl text-6xl leading-[0.88] tracking-[0.02em] text-balance text-[#172033] sm:text-8xl"
              >
                CRAWFISH BOIL.
                <br />
                POOLSIDE DAY PARTY.
                <br />
                LIVE MUSIC IN THE MIX.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#24344d]">
                Bubelpalooza at Bubel Beach Club is built like a sun-faded
                summer flyer come to life: crawfish, water, good people, and a
                mini showcase that keeps the whole thing buzzing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border-0 bg-[#e6392e] px-7 text-base text-[#fff7e6] hover:bg-[#cf2f24]"
                >
                  <a href="#tickets">See ticket plans</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#172033]/20 bg-[#fff7e6] px-7 text-base text-[#172033] hover:bg-[#fff1c7]"
                >
                  <a href="#lineup">See the vibe</a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.75rem] border border-[#172033]/18 bg-[#fff7e6] px-5 py-5 text-[#172033]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e6392e]">
                    Boil
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#344760]">
                    Big crawfish-boil energy, shared plates, and a reason to
                    show up hungry.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-[#172033]/18 bg-[#fff7e6] px-5 py-5 text-[#172033]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2ec4f3]">
                    Pool
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#344760]">
                    Cool off, kick back, and let the whole day feel like a
                    beach-club hangout instead of a rigid schedule.
                  </p>
                </div>
                <div
                  id="lineup"
                  className="rounded-[1.75rem] border border-[#172033]/18 bg-[#fff7e6] px-5 py-5 text-[#172033]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f72585]">
                    Music
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#344760]">
                    Live music keeps the atmosphere moving without turning the
                    event into a concert-first pitch.
                  </p>
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between gap-4 border-t border-white/10 px-6 py-8 text-[#fff7e6] lg:border-t-0 lg:border-l">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ffd447]">
                  Festival Flyer Notes
                </p>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-3xl" data-poster="true">
                      SUMMER
                    </p>
                    <p className="mt-1 text-sm text-[#a7b0c0]">
                      Bubel Beach Club atmosphere
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl" data-poster="true">
                      FOOD
                    </p>
                    <p className="mt-1 text-sm text-[#a7b0c0]">
                      Crawfish, heat, and hospitality
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl" data-poster="true">
                      MUSIC
                    </p>
                    <p className="mt-1 text-sm text-[#a7b0c0]">
                      A showcase built into the day
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-[#2ec4f3]/20 bg-[#172033] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#2ec4f3]">
                  Event summary
                </p>
                <p className="mt-3 text-sm leading-6 text-[#f7dfa5]">
                  Come for the boil, stay for the poolside party, and let the
                  live music give the whole thing its rhythm.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card
            id="tickets"
            className="poster-panel ticket-cutout border-[#e6392e]/30 text-[#172033]"
          >
            <CardHeader>
              <CardTitle className="text-3xl uppercase tracking-[0.06em]">
                Tickets should feel obvious
              </CardTitle>
              <CardDescription className="text-[#4e5b71]">
                The site is headed toward a simple, direct purchase path with
                ticket options that feel more like event stubs than product tiers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-6 text-[#344760]">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[#172033]/15 bg-[#fff7e6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#e6392e]">
                    General
                  </p>
                  <p className="mt-2 text-sm">Quick entry and a clean checkout experience.</p>
                </div>
                <div className="rounded-[1.5rem] border border-[#172033]/15 bg-[#fff7e6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#2ec4f3]">
                    Group-friendly
                  </p>
                  <p className="mt-2 text-sm">Easy for families and friend groups to plan together.</p>
                </div>
                <div className="rounded-[1.5rem] border border-[#172033]/15 bg-[#fff7e6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#f97316]">
                    Event-ready
                  </p>
                  <p className="mt-2 text-sm">Clear follow-up details once guests buy in.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t-[#e5c988] bg-[#fff7e6]/70">
              <Button className="rounded-full px-6">Ticket plans coming soon</Button>
            </CardFooter>
          </Card>

          <Card id="merch" className="dark-panel border-[#2ec4f3]/30">
            <CardHeader>
              <CardTitle className="text-3xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Merch belongs on the poster too
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                Shirts and event extras should feel like part of the same visual
                world, not a separate store dropped onto the site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-[#f7dfa5]">
              <p>
                The first merch pass should stay simple, graphic, and easy to
                browse, with the same bold attitude as the event itself.
              </p>
            </CardContent>
            <CardFooter className="border-t-white/10 bg-[#101827]/55">
              <Button
                variant="outline"
                className="rounded-full border-[#2ec4f3]/40 bg-[#183a59]/60 text-[#fff7e6] hover:bg-[#183a59]"
              >
                Merch preview coming soon
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="poster-panel rounded-[2rem] border border-[#d9a441]/40 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e6392e]">
                Event Summary
              </p>
              <h2
                data-poster="true"
                className="mt-4 max-w-xl text-5xl leading-[0.9] tracking-[0.02em] text-balance text-[#172033]"
              >
                A SUMMER FLYER WITH REAL FOOD, WATER, PEOPLE, AND RHYTHM.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#344760]">
              Bubelpalooza should feel like a destination, not a generic event
              listing. The site needs to sell the vibe immediately: the boil,
              the pool, the music, the warmth, and the easygoing energy that
              makes Bubel Beach Club feel like its own world for the day.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="dark-panel border-[#ffd447]/30">
            <CardHeader>
              <CardTitle className="text-xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Sun-faded flyer
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                Big blocks, loud headlines, and playful shapes over generic
                landing-page polish.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="dark-panel border-[#e6392e]/30">
            <CardHeader>
              <CardTitle className="text-xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Graphic-driven mood
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                More stickers, badges, and poster panels. Fewer stacked “feature cards.”
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="dark-panel border-[#2ec4f3]/30">
            <CardHeader>
              <CardTitle className="text-xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Ticket trust still matters
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                The marketing can feel loose and fun, while purchase paths stay
                direct and credible.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}
