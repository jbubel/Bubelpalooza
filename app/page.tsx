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
    <div className="px-6 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,#fff1df_0%,#fff8f0_45%,#fff_100%)] shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
          <div className="grid gap-10 px-8 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-700">
                Bubelpalooza
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
                A crawfish boil and pool party with live music built into the day.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Come hungry, stay all afternoon, and settle into a relaxed day
                of great food, cold drinks, sunshine, and a mini showcase that
                keeps the energy up without stealing the spotlight.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#tickets">See ticket plans</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#merch">Explore merch</a>
                </Button>
              </div>
            </div>
            <Card className="border-white/70 bg-white/85">
              <CardHeader>
                <CardTitle>What to expect</CardTitle>
                <CardDescription>
                  Bubelpalooza is designed to feel easygoing, festive, and
                  worth making a day of.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-slate-600">
                <div>
                  <p className="font-medium text-slate-900">Boil at the center</p>
                  <p className="mt-1">Crawfish, shared plates, and the kind of food that gets everyone gathering around the table.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Poolside energy</p>
                  <p className="mt-1">A casual summer-party atmosphere with room to relax, cool off, and spend time with friends and family.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Music in the mix</p>
                  <p className="mt-1">A compact live showcase that adds rhythm and personality to the day without turning the event into a concert-first experience.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Food-first gathering</CardTitle>
              <CardDescription>
                Built around the crawfish boil and the kind of hospitality that
                makes guests want to linger.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Pool-party mood</CardTitle>
              <CardDescription>
                Light, social, and summer-driven rather than formal or overly
                scheduled.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Live music touches</CardTitle>
              <CardDescription>
                A mini showcase that rounds out the atmosphere and gives the day
                a little extra spark.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card id="tickets" className="border-orange-100 bg-orange-50/75">
            <CardHeader>
              <CardTitle>Tickets will be the easiest way in</CardTitle>
              <CardDescription>
                The site is being prepared for a simple checkout flow with clear
                options, quick confirmation, and a smooth path to event-day info.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <p>
                Expect clear admission options, quick purchase steps, and
                follow-up details that help guests feel ready before they
                arrive.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Ticket options coming soon</Button>
            </CardFooter>
          </Card>

          <Card id="merch" className="bg-slate-50/90">
            <CardHeader>
              <CardTitle>Merch is part of the experience</CardTitle>
              <CardDescription>
                Event shirts and related items will live alongside ticketing so
                the site feels like one cohesive event home.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <p>
                The first version will keep merchandise straightforward and
                easy to browse, with room to expand as the event brand grows.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Merch preview coming soon</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Why people will want to come</CardTitle>
              <CardDescription>
                The goal is a day that feels welcoming, memorable, and easy to
                say yes to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="food">
                  <AccordionTrigger>It feels like a real gathering</AccordionTrigger>
                  <AccordionContent>
                    Bubelpalooza should feel social and lived-in, not like a
                    transactional event page with a ticket button bolted onto it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pace">
                  <AccordionTrigger>The day has a natural flow</AccordionTrigger>
                  <AccordionContent>
                    Guests can picture the rhythm immediately: arrive, eat,
                    hang out, cool off, enjoy the atmosphere, and stay awhile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="music">
                  <AccordionTrigger>Music adds texture, not confusion</AccordionTrigger>
                  <AccordionContent>
                    The showcase supports the identity of the event rather than
                    changing the pitch into something that feels like a different product.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <section className="rounded-[2rem] border border-black/5 bg-[linear-gradient(180deg,#fff_0%,#f8fafc_100%)] px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Event Summary
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-slate-950">
              A relaxed, flavor-forward summer event with its own personality.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
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
