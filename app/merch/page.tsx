import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MERCH_ASSETS, ticketPackages } from "@/lib/merch/catalog";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Preview the $25 Bubelpalooza complete package with entry, boil, shirt, koozie, and sticker.",
};

function getCompletePackage() {
  const packageDetails = ticketPackages.find(
    (ticketPackage) => ticketPackage.id === "complete",
  );

  if (!packageDetails) {
    throw new Error("Complete package is missing from the merch catalog.");
  }

  return packageDetails;
}

const completeIncludes = ["Entry", "Boil", "Shirt", "Koozie", "Sticker"];
const viewportSafeWidth = {
  width: "min(100%, calc(100vw - 2.5rem))",
};

export default function MerchPage() {
  const completePackage = getCompletePackage();

  return (
    <div className="bg-[#ffd447] text-[#102344]">
      <section className="relative isolate overflow-hidden border-b-[10px] border-[#102344] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[34%] bg-[#fff1c7] lg:block" />
        <div className="absolute bottom-0 left-0 -z-10 h-24 w-full bg-[#2ec4f3] lg:h-40 lg:w-[58%]" />
        <div className="absolute left-0 top-0 -z-10 h-20 w-32 bg-[#e6392e] sm:h-28 sm:w-48" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="min-w-0" style={viewportSafeWidth}>
            <p className="inline-block border-4 border-[#102344] bg-[#2ec4f3] px-4 py-2 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344]">
              Merch preview
            </p>
            <h1
              data-poster="true"
              className="mt-5 max-w-4xl text-[4.15rem] leading-[0.84] text-[#e6392e] min-[430px]:text-7xl sm:text-8xl"
            >
              <span className="block">THE</span>
              <span className="block">$25</span>
              <span className="block">PACKAGE.</span>
            </h1>
            <p className="mt-5 max-w-[18rem] text-xl font-black leading-8 text-[#102344] sm:max-w-xl sm:text-2xl sm:leading-9">
              Entry, crawfish, shirt, koozie, sticker.
            </p>
            <div className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-none border-4 border-[#102344] bg-[#e6392e] px-7 py-4 text-base font-black uppercase text-white shadow-[6px_6px_0_#102344] hover:bg-[#cf2f24] sm:w-auto"
              >
                <Link href="#complete-package">Included</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto w-full rounded-none border-4 border-[#102344] bg-[#fff1c7] px-7 py-4 text-base font-black uppercase text-[#102344] shadow-[6px_6px_0_#102344] hover:bg-[#fff7e6] sm:w-auto"
              >
                <Link href="/#tickets">Event passes</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-w-0" style={viewportSafeWidth}>
            <div className="absolute -right-5 top-4 h-28 w-28 bg-[#e6392e] sm:h-40 sm:w-40" />
            <div className="absolute -bottom-4 left-4 h-20 w-48 bg-[#102344] sm:h-28 sm:w-72" />
            <Image
              src={MERCH_ASSETS.lineupCutout}
              alt="Bubelpalooza complete package merch with event shirts, koozies, and sticker."
              width={1448}
              height={1086}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="relative h-auto w-full drop-shadow-[10px_14px_0_rgba(16,35,68,0.22)]"
            />
          </div>
        </div>
      </section>

      <section
        id="complete-package"
        className="scroll-mt-36 bg-[#fff1c7] px-5 py-12 text-[#102344] sm:px-8 lg:scroll-mt-28 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="min-w-0" style={viewportSafeWidth}>
            <p className="inline-block bg-[#102344] px-4 py-2 text-sm font-black uppercase text-[#ffd447] shadow-[5px_5px_0_#e6392e]">
              Best deal
            </p>
            <h2
              data-poster="true"
              className="mt-5 text-5xl leading-[0.9] text-[#102344] sm:text-7xl"
            >
              {completePackage.priceLabel} FOR THE WHOLE DAY.
            </h2>
            <p className="mt-5 max-w-xl border-l-8 border-[#2ec4f3] bg-[#102344] px-5 py-4 text-lg font-semibold leading-8 text-[#fff7e6] shadow-[8px_8px_0_#e6392e]">
              Pick it up at check-in, then settle in for crawfish, pool time,
              and live music.
            </p>
          </div>

          <article
            className="min-w-0 border-4 border-[#102344] bg-[#e6392e] p-5 text-white shadow-[10px_10px_0_#102344]"
            style={viewportSafeWidth}
          >
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <p className="inline-block bg-[#ffd447] px-3 py-1 text-xs font-black uppercase text-[#102344]">
                  Complete package
                </p>
                <h3
                  data-poster="true"
                  className="mt-4 text-5xl leading-[0.88] sm:text-6xl"
                >
                  {completePackage.name}
                </h3>
              </div>
              <p
                data-poster="true"
                className="bg-[#102344] px-4 py-3 text-6xl leading-none text-[#ffd447]"
              >
                {completePackage.priceLabel}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {completeIncludes.map((item) => (
                <p
                  key={item}
                  className="border-2 border-white bg-[#102344] px-3 py-3 text-center text-sm font-black uppercase text-[#ffd447]"
                >
                  {item}
                </p>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-lg font-black leading-8 text-[#fff7e6]">
              The event pass with the 2026 gear built in.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
