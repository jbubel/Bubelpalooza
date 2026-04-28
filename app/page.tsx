import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
        <section className="dark-panel relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,212,71,0.35),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(247,37,133,0.28),transparent_16%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.03)_100%)]" />
          <div className="relative grid gap-10 px-8 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#172033]">
                <span className="sun-badge rounded-full bg-[#ffd447] px-4 py-2">
                  Bubelpalooza
                </span>
                <span className="rounded-full border border-[#2ec4f3]/40 bg-[#2ec4f3] px-4 py-2 text-[#101827]">
                  Bubel Beach Club
                </span>
                <span className="rounded-full border border-[#f97316]/40 bg-[#fff1c7] px-4 py-2 text-[#172033]">
                  Summer festival energy
                </span>
              </div>
              <h1
                data-poster="true"
                className="mt-6 max-w-3xl text-5xl leading-[0.95] tracking-[0.02em] text-balance text-[#fff7e6] sm:text-7xl"
              >
                CRAWFISH. POOLSIDE. LIVE MUSIC. ALL AT BUBEL BEACH CLUB.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f7dfa5]">
                Come hungry, stay all afternoon, and settle into a relaxed day
                of great food, cold drinks, sunshine, and a mini showcase that
                keeps the energy up without stealing the spotlight.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6 text-base">
                  <a href="#tickets">See ticket plans</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#2ec4f3]/45 bg-[#172033]/70 px-6 text-base text-[#fff7e6] hover:bg-[#183a59]"
                >
                  <a href="#merch">Explore merch</a>
                </Button>
              </div>
            </div>
            <Card className="poster-panel ticket-cutout border-[#d9a441]/40 text-[#172033]">
              <CardHeader>
                <CardTitle className="text-2xl uppercase tracking-[0.06em]">
                  What to expect
                </CardTitle>
                <CardDescription className="text-[#4e5b71]">
                  Bubelpalooza is designed to feel easygoing, festive, and
                  worth making a day of.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-[#4e5b71]">
                <div>
                  <p className="font-semibold uppercase tracking-[0.08em] text-[#e6392e]">
                    Boil at the center
                  </p>
                  <p className="mt-1">
                    Crawfish, shared plates, and the kind of food that gets
                    everyone gathering around the table.
                  </p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-[0.08em] text-[#2ec4f3]">
                    Poolside energy
                  </p>
                  <p className="mt-1">
                    A casual summer-party atmosphere with room to relax, cool
                    off, and spend time with friends and family.
                  </p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-[0.08em] text-[#f72585]">
                    Music in the mix
                  </p>
                  <p className="mt-1">
                    A compact live showcase that adds rhythm and personality to
                    the day without turning the event into a concert-first
                    experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="dark-panel border-[#e6392e]/25">
            <CardHeader>
              <CardTitle className="text-[#fff7e6] uppercase tracking-[0.06em]">
                Food-first gathering
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                Built around the crawfish boil and the kind of hospitality that
                makes guests want to linger.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="dark-panel border-[#2ec4f3]/25">
            <CardHeader>
              <CardTitle className="text-[#fff7e6] uppercase tracking-[0.06em]">
                Pool-party mood
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                Light, social, and summer-driven rather than formal or overly
                scheduled.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="dark-panel border-[#ffd447]/25">
            <CardHeader>
              <CardTitle className="text-[#fff7e6] uppercase tracking-[0.06em]">
                Live music touches
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                A mini showcase that rounds out the atmosphere and gives the day
                a little extra spark.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card
            id="tickets"
            className="poster-panel ticket-cutout border-[#e6392e]/25 text-[#172033]"
          >
            <CardHeader>
              <CardTitle className="text-2xl uppercase tracking-[0.06em]">
                Tickets will be the easiest way in
              </CardTitle>
              <CardDescription className="text-[#4e5b71]">
                The site is being prepared for a simple checkout flow with clear
                options, quick confirmation, and a smooth path to event-day info.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-[#4e5b71]">
              <p>
                Expect clear admission options, quick purchase steps, and
                follow-up details that help guests feel ready before they
                arrive.
              </p>
            </CardContent>
            <CardFooter className="border-t-[#e5c988] bg-[#fff7e6]/70">
              <Button className="rounded-full px-5">Ticket options coming soon</Button>
            </CardFooter>
          </Card>

          <Card id="merch" className="dark-panel border-[#2ec4f3]/25">
            <CardHeader>
              <CardTitle className="text-2xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Merch is part of the experience
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                Event shirts and related items will live alongside ticketing so
                the site feels like one cohesive event home.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-[#f7dfa5]">
              <p>
                The first version will keep merchandise straightforward and
                easy to browse, with room to expand as the event brand grows.
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

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="dark-panel border-[#ffd447]/25">
            <CardHeader>
              <CardTitle className="text-2xl uppercase tracking-[0.06em] text-[#fff7e6]">
                Why people will want to come
              </CardTitle>
              <CardDescription className="text-[#a7b0c0]">
                The goal is a day that feels welcoming, memorable, and easy to
                say yes to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="food">
                  <AccordionTrigger className="text-[#fff7e6]">
                    It feels like a real gathering
                  </AccordionTrigger>
                  <AccordionContent className="text-[#f7dfa5]">
                    Bubelpalooza should feel social and lived-in, not like a
                    transactional event page with a ticket button bolted onto it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pace">
                  <AccordionTrigger className="text-[#fff7e6]">
                    The day has a natural flow
                  </AccordionTrigger>
                  <AccordionContent className="text-[#f7dfa5]">
                    Guests can picture the rhythm immediately: arrive, eat,
                    hang out, cool off, enjoy the atmosphere, and stay awhile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="music">
                  <AccordionTrigger className="text-[#fff7e6]">
                    Music adds texture, not confusion
                  </AccordionTrigger>
                  <AccordionContent className="text-[#f7dfa5]">
                    The showcase supports the identity of the event rather than
                    changing the pitch into something that feels like a different product.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <section className="poster-panel rounded-[2rem] border border-[#d9a441]/35 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e6392e]">
              Event Summary
            </p>
            <h2
              data-poster="true"
              className="mt-4 text-4xl leading-[0.96] tracking-[0.02em] text-balance text-[#172033]"
            >
              A relaxed, flavor-forward summer event with its own personality.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#4e5b71]">
              The site should help guests understand the tone right away:
              Bubelpalooza is about the boil, the pool, the people, and the
              laid-back energy that makes the day feel special. The music is
              part of the draw, but the full experience is what makes it worth
              attending.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
