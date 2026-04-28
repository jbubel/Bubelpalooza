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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-black/5 bg-white/90 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
          Bubelpalooza
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          The component foundation is ready for the event experience.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          The app now has shared UI primitives in place so the public event site
          can grow with less visual churn and less component rework.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Tickets coming soon</Button>
          <Button variant="outline">Merch preview next</Button>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-orange-100 bg-orange-50/70">
            <CardHeader>
              <CardTitle>Shared layout in place</CardTitle>
              <CardDescription>
                Future pages can now plug into a consistent shell and component
                set instead of re-creating UI patterns route by route.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="foundation">
                  <AccordionTrigger>What is already set up?</AccordionTrigger>
                  <AccordionContent>
                    The app has a reusable header, footer, baseline metadata,
                    and the first `shadcn/ui` primitives needed for upcoming
                    homepage and FAQ work.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="next">
                  <AccordionTrigger>Why add components this early?</AccordionTrigger>
                  <AccordionContent>
                    Establishing the design primitives now helps keep later page
                    work consistent and reduces UI cleanup once ticketing and
                    event information pages expand.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card className="bg-slate-50/90">
            <CardHeader>
              <CardTitle>Next suggested step</CardTitle>
              <CardDescription>
                Build the real homepage and supporting event-information pages
                on top of this shared shell and component baseline.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
