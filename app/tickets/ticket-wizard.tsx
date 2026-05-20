"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  Check,
  CreditCard,
  Plus,
  Shirt,
  Ticket,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  koozieTypeOptions,
  packageRequiresMerch,
  shirtColorOptions,
  shirtSizeOptions,
  shirtStyleOptions,
  ticketPackages,
  type KoozieType,
  type PackageId,
  type ShirtColor,
  type ShirtSize,
  type ShirtStyle,
} from "@/lib/merch/catalog";
import {
  MAX_PASSES_PER_ORDER,
  TICKET_CART_STORAGE_KEY,
  describeKoozieSelection,
  describeShirtSelection,
  dollarsToCents,
  formatCents,
  getTicketPackage,
  ticketCartSchema,
  ticketWizardStorageSchema,
  type TicketCartInput,
  type TicketCartPassInput,
  type TicketWizardPass,
} from "@/lib/tickets/cart";

type CheckoutResponse = {
  ok: boolean;
  url?: string;
  message?: string;
};

const inputClassName =
  "w-full border-4 border-[#102344] bg-[#fff7e6] px-3 py-3 text-base font-black text-[#102344] shadow-[4px_4px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white";
const DEFAULT_NAME_YOUR_PRICE_DOLLARS = "7";
const isCheckoutEnabled =
  process.env.NEXT_PUBLIC_TICKETS_CHECKOUT_ENABLED === "true";
const checkoutComingSoonMessage =
  "Tickets open soon. You can choose your packages now and come back shortly to buy.";

function sanitizeDollarInput(value: string) {
  const normalized = value.replace(/[^\d.]/g, "");
  const [dollars = "", ...rest] = normalized.split(".");
  const cents = rest.join("").slice(0, 2);

  return rest.length > 0 ? `${dollars}.${cents}` : dollars;
}

function formatDollarInput(value: string) {
  const cents = dollarsToCents(value);

  if (cents <= 0) {
    return "0";
  }

  const dollars = cents / 100;

  return cents % 100 === 0 ? String(dollars) : dollars.toFixed(2);
}

function createPass(): TicketWizardPass {
  return {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now()),
    packageId: "complete",
    nameYourPriceDollars: DEFAULT_NAME_YOUR_PRICE_DOLLARS,
    shirtStyle: "",
    shirtColor: "",
    shirtSize: "",
    koozieType: "",
  };
}

function getInitialWizardState() {
  const fallback = {
    passes: [createPass()],
    donationDollars: "0",
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  const storedCart = window.localStorage.getItem(TICKET_CART_STORAGE_KEY);

  if (!storedCart) {
    return fallback;
  }

  try {
    const parsed = ticketWizardStorageSchema.safeParse(JSON.parse(storedCart));

    return parsed.success ? parsed.data : fallback;
  } catch {
    window.localStorage.removeItem(TICKET_CART_STORAGE_KEY);
    return fallback;
  }
}

function normalizePassForPackage(
  pass: TicketWizardPass,
  packageId: PackageId,
): TicketWizardPass {
  const requirements = packageRequiresMerch(packageId);
  const nameYourPriceDollars =
    packageId !== "name-your-price"
      ? pass.nameYourPriceDollars
      : pass.packageId === "name-your-price" ||
          dollarsToCents(pass.nameYourPriceDollars) > 0
        ? pass.nameYourPriceDollars
        : DEFAULT_NAME_YOUR_PRICE_DOLLARS;

  return {
    ...pass,
    packageId,
    nameYourPriceDollars,
    shirtStyle: requirements.shirt ? pass.shirtStyle : "",
    shirtColor: requirements.shirt ? pass.shirtColor : "",
    shirtSize: requirements.shirt ? pass.shirtSize : "",
    koozieType: requirements.koozie ? pass.koozieType : "",
  };
}

function getDraftPassPriceCents(pass: TicketWizardPass) {
  const selectedPackage = getTicketPackage(pass.packageId);

  return selectedPackage.priceCents ?? dollarsToCents(pass.nameYourPriceDollars);
}

function getDraftPassWarnings(pass: TicketWizardPass) {
  const requirements = packageRequiresMerch(pass.packageId);
  const warnings: string[] = [];

  if (requirements.shirt && (!pass.shirtStyle || !pass.shirtColor || !pass.shirtSize)) {
    warnings.push("Choose shirt style, color, and size.");
  }

  if (requirements.koozie && !pass.koozieType) {
    warnings.push("Choose a koozie fit.");
  }

  return warnings;
}

function passToCartPass(pass: TicketWizardPass): TicketCartPassInput {
  const requirements = packageRequiresMerch(pass.packageId);
  const cartPass: TicketCartPassInput = {
    packageId: pass.packageId,
    nameYourPriceCents:
      pass.packageId === "name-your-price"
        ? dollarsToCents(pass.nameYourPriceDollars)
        : 0,
  };

  if (requirements.shirt && pass.shirtStyle && pass.shirtColor && pass.shirtSize) {
    cartPass.shirtSelection = {
      style: pass.shirtStyle,
      color: pass.shirtColor,
      size: pass.shirtSize,
    };
  }

  if (requirements.koozie && pass.koozieType) {
    cartPass.koozieSelection = {
      type: pass.koozieType,
    };
  }

  return cartPass;
}

function buildCart(
  passes: TicketWizardPass[],
  donationDollars: string,
): TicketCartInput {
  return {
    passes: passes.map(passToCartPass),
    donationCents: dollarsToCents(donationDollars),
  };
}

function getPassSummary(pass: TicketWizardPass) {
  const requirements = packageRequiresMerch(pass.packageId);
  const details: string[] = [];

  if (requirements.shirt) {
    if (pass.shirtStyle && pass.shirtColor && pass.shirtSize) {
      details.push(
        `Shirt: ${describeShirtSelection({
          style: pass.shirtStyle,
          color: pass.shirtColor,
          size: pass.shirtSize,
        })}`,
      );
    } else {
      details.push("Shirt choice needed.");
    }
  }

  if (requirements.koozie) {
    if (pass.koozieType) {
      details.push(
        `Koozie: ${describeKoozieSelection({
          type: pass.koozieType,
        })}`,
      );
    } else {
      details.push("Koozie fit needed.");
    }
  }

  if (!requirements.shirt && !requirements.koozie) {
    details.push("No merch choices needed.");
  }

  return details;
}

type TicketOption<TValue extends string> = {
  value: TValue;
  label: string;
  description?: string;
};

function OptionButtonGroup<TValue extends string>({
  label,
  value,
  options,
  onChange,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  label: string;
  value: TValue | "";
  options: TicketOption<TValue>[];
  onChange: (value: TValue) => void;
  columns?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase text-[#102344]">{label}</p>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className={[
                "min-h-12 border-2 px-3 py-2 text-left text-sm font-black uppercase shadow-[3px_3px_0_#102344] transition hover:-translate-y-0.5",
                isSelected
                  ? "border-[#102344] bg-[#183a59] text-[#ffd447]"
                  : "border-[#102344]/70 bg-[#fff7e6] text-[#102344] hover:bg-white",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                {isSelected ? <Check className="size-4 shrink-0" /> : null}
                <span>{option.label}</span>
              </span>
              {option.description ? (
                <span className="mt-1 block text-xs font-semibold normal-case leading-4 text-current opacity-80">
                  {option.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MoneyInput({
  label,
  helperText,
  value,
  onChange,
  presets,
  defaultValue,
  accent = "blue",
}: {
  label: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  presets: string[];
  defaultValue: string;
  accent?: "blue" | "yellow";
}) {
  const inputId = useId();
  const [isCustomMode, setIsCustomMode] = useState(
    !presets.includes(formatDollarInput(value)),
  );
  const accentClassName =
    accent === "yellow" ? "bg-[#ffd447]" : "bg-[#2ec4f3]";
  const formattedValue = formatDollarInput(value);
  const showCustomInput = isCustomMode;

  return (
    <div>
      <p className="mb-2 block text-sm font-black uppercase text-[#102344]">
        {label}
      </p>
      {helperText ? (
        <p className="mb-2 text-xs font-semibold leading-5 text-[#344760]">
          {helperText}
        </p>
      ) : null}

      <div className="grid grid-cols-4 gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setIsCustomMode(false);
              onChange(preset);
            }}
            className={[
              "border-2 border-[#102344] px-2 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#102344] transition hover:-translate-y-0.5",
              !isCustomMode && formattedValue === preset
                ? "bg-[#183a59] text-[#ffd447]"
                : "bg-[#fff7e6] text-[#102344] hover:bg-white",
            ].join(" ")}
          >
            ${preset}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setIsCustomMode(true);

          if (!showCustomInput) {
            onChange(defaultValue);
          }

          window.setTimeout(() => document.getElementById(inputId)?.focus(), 0);
        }}
        className={[
          "mt-2 flex min-h-10 w-full items-center justify-center border-2 border-[#102344] px-3 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#102344] transition hover:-translate-y-0.5",
          showCustomInput
            ? "bg-[#183a59] text-[#ffd447]"
            : "bg-[#fff7e6] text-[#102344] hover:bg-white",
        ].join(" ")}
      >
        Custom amount
      </button>

      {showCustomInput ? (
        <label htmlFor={inputId} className="mt-3 block">
          <span className="sr-only">{label}</span>
          <span className="grid grid-cols-[auto_1fr] items-center">
            <span
              className={`border-y-4 border-l-4 border-[#102344] px-4 py-3 text-base font-black text-[#102344] shadow-[4px_4px_0_#102344] ${accentClassName}`}
            >
              $
            </span>
            <input
              id={inputId}
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(event) => onChange(sanitizeDollarInput(event.target.value))}
              onBlur={() => onChange(formatDollarInput(value))}
              className={inputClassName}
            />
          </span>
        </label>
      ) : null}
    </div>
  );
}

export function TicketWizard() {
  const [initialWizardState] = useState(getInitialWizardState);
  const [passes, setPasses] = useState<TicketWizardPass[]>(
    initialWizardState.passes,
  );
  const [donationDollars, setDonationDollars] = useState(
    initialWizardState.donationDollars,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const featuredPackage = ticketPackages.find(
    (ticketPackage) => ticketPackage.featured,
  );
  const additionalPackages = ticketPackages.filter(
    (ticketPackage) => !ticketPackage.featured,
  );

  useEffect(() => {
    window.localStorage.setItem(
      TICKET_CART_STORAGE_KEY,
      JSON.stringify({
        passes,
        donationDollars,
      }),
    );
  }, [donationDollars, passes]);

  const cartInput = useMemo(
    () => buildCart(passes, donationDollars),
    [donationDollars, passes],
  );
  const cartResult = useMemo(() => ticketCartSchema.safeParse(cartInput), [cartInput]);
  const passSubtotalCents = passes.reduce(
    (sum, pass) => sum + getDraftPassPriceCents(pass),
    0,
  );
  const donationCents = dollarsToCents(donationDollars);
  const totalCents = passSubtotalCents + donationCents;
  const canAddPass = passes.length < MAX_PASSES_PER_ORDER;
  const hasMissingSelections = passes.some(
    (pass) => getDraftPassWarnings(pass).length > 0,
  );

  function updatePass(
    passId: string,
    updater: (pass: TicketWizardPass) => TicketWizardPass,
  ) {
    setCheckoutError(null);
    setPasses((currentPasses) =>
      currentPasses.map((pass) => (pass.id === passId ? updater(pass) : pass)),
    );
  }

  function updatePassPackage(passId: string, packageId: PackageId) {
    updatePass(passId, (pass) => normalizePassForPackage(pass, packageId));
  }

  function addPass() {
    if (!canAddPass) {
      return;
    }

    setCheckoutError(null);
    setPasses((currentPasses) => [...currentPasses, createPass()]);
  }

  function removePass(passId: string) {
    setCheckoutError(null);
    setPasses((currentPasses) =>
      currentPasses.length === 1
        ? currentPasses
        : currentPasses.filter((pass) => pass.id !== passId),
    );
  }

  async function handleCheckout() {
    if (!isCheckoutEnabled) {
      setCheckoutError(checkoutComingSoonMessage);
      return;
    }

    const parsedCart = ticketCartSchema.safeParse(buildCart(passes, donationDollars));

    if (!parsedCart.success) {
      setCheckoutError("Finish the highlighted choices before checkout.");
      return;
    }

    setIsSubmitting(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedCart.data),
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.ok || !data.url) {
        setCheckoutError(data.message ?? "Checkout is not available right now.");
        return;
      }

      window.location.assign(data.url);
    } catch {
      setCheckoutError("Checkout is not available right now. Please try again soon.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const orderSummary = (
    <>
      <p className="inline-block bg-[#e6392e] px-3 py-1 text-xs font-black uppercase text-white">
        Order summary
      </p>
      <h2 data-poster="true" className="mt-4 text-4xl leading-none text-[#102344]">
        {formatCents(totalCents)}
      </h2>

      <div className="mt-5 space-y-4">
        {passes.map((pass, passIndex) => (
          <div
            key={pass.id}
            className="border-b-2 border-[#102344]/30 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase text-[#102344]">
                  Pass {passIndex + 1}: {getTicketPackage(pass.packageId).shortName}
                </p>
                {getPassSummary(pass).map((summary) => (
                  <p
                    key={summary}
                    className="mt-1 text-xs font-semibold leading-5 text-[#344760]"
                  >
                    {summary}
                  </p>
                ))}
              </div>
              <p className="shrink-0 text-sm font-black">
                {formatCents(getDraftPassPriceCents(pass))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <MoneyInput
          label="Extra donation"
          helperText="Choose an amount or enter your own."
          value={donationDollars}
          onChange={(value) => {
            setCheckoutError(null);
            setDonationDollars(value);
          }}
          presets={["0", "10", "25", "50"]}
          defaultValue="0"
          accent="blue"
        />
      </div>

      <div className="mt-5 space-y-2 border-y-4 border-[#102344] py-4 text-sm font-black">
        <div className="flex justify-between gap-3">
          <span>Passes</span>
          <span>{formatCents(passSubtotalCents)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Donation</span>
          <span>{formatCents(donationCents)}</span>
        </div>
      </div>

      {checkoutError ? (
        <p className="mt-4 border-4 border-[#102344] bg-white px-3 py-2 text-sm font-black text-[#e6392e] shadow-[4px_4px_0_#102344]">
          {checkoutError}
        </p>
      ) : !isCheckoutEnabled ? (
        <p className="mt-4 border-4 border-[#102344] bg-white px-3 py-2 text-sm font-black text-[#344760] shadow-[4px_4px_0_#102344]">
          {checkoutComingSoonMessage}
        </p>
      ) : null}

      <Button
        type="button"
        onClick={handleCheckout}
        disabled={
          !isCheckoutEnabled ||
          isSubmitting ||
          !cartResult.success ||
          hasMissingSelections
        }
        className="mt-5 h-auto w-full rounded-none border-4 border-[#102344] bg-[#e6392e] px-6 py-4 text-sm font-black uppercase text-white shadow-[5px_5px_0_#102344] hover:bg-[#cf2f24] disabled:translate-y-0 disabled:opacity-60"
      >
        <CreditCard className="size-4" />
        {isCheckoutEnabled
          ? isSubmitting
            ? "Opening checkout..."
            : "Secure checkout"
          : "Checkout coming soon"}
      </Button>

      <p className="mt-4 text-xs font-semibold leading-5 text-[#344760]">
        {isCheckoutEnabled
          ? "Stripe checkout opens in a secure window, and your merch picks stay with your passes for event-day pickup."
          : "Package picks are open for browsing now. Ticket sales will open soon."}
      </p>
    </>
  );

  return (
    <div className="grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:pb-0">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 border-4 border-[#102344] bg-[#fff1c7] p-4 shadow-[8px_8px_0_#102344] sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="inline-flex items-center gap-2 bg-[#102344] px-3 py-1 text-xs font-black uppercase text-[#ffd447]">
              <Ticket className="size-4" />
              Build your passes
            </p>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-[#344760] sm:text-base sm:leading-7">
              Add up to six guests, then choose the package and merch for each
              pass.
            </p>
          </div>
          <Button
            type="button"
            onClick={addPass}
            disabled={!canAddPass}
            className="h-auto rounded-none border-4 border-[#102344] bg-[#2ec4f3] px-5 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-[#6fd8f7] disabled:translate-y-0 disabled:opacity-60"
          >
            <Plus className="size-4" />
            Add pass
          </Button>
        </div>

        {passes.map((pass, passIndex) => {
          const warnings = getDraftPassWarnings(pass);
          const requirements = packageRequiresMerch(pass.packageId);

          return (
            <article
              key={pass.id}
              className="border-4 border-[#102344] bg-[#fff7e6] p-4 text-[#102344] shadow-[8px_8px_0_#102344] sm:p-5"
            >
              <div className="flex flex-col gap-3 border-b-4 border-[#102344] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-[#e6392e]">
                    Pass {passIndex + 1}
                  </p>
                  <h2
                    data-poster="true"
                    className="mt-1 text-4xl leading-none text-[#102344]"
                  >
                    {getTicketPackage(pass.packageId).shortName} /{" "}
                    {formatCents(getDraftPassPriceCents(pass))}
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removePass(pass.id)}
                  disabled={passes.length === 1}
                  className="h-auto rounded-none border-4 border-[#102344] bg-[#fff1c7] px-4 py-2 text-xs font-black uppercase text-[#102344] shadow-[4px_4px_0_#102344] hover:bg-white disabled:translate-y-0 disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                  Remove
                </Button>
              </div>

              <fieldset className="mt-5">
                <legend className="mb-3 text-sm font-black uppercase text-[#102344]">
                  Package
                </legend>
                <div className="grid gap-4">
                  {featuredPackage ? (
                    <button
                      type="button"
                      aria-pressed={pass.packageId === featuredPackage.id}
                      onClick={() => updatePassPackage(pass.id, featuredPackage.id)}
                      className={[
                        "grid min-h-40 border-4 p-4 text-left shadow-[5px_5px_0_#102344] transition hover:-translate-y-0.5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-5",
                        pass.packageId === featuredPackage.id
                          ? "border-[#102344] bg-[#e6392e] text-white"
                          : "border-[#102344]/75 bg-[#fff7e6] text-[#102344] hover:bg-white",
                      ].join(" ")}
                    >
                      <span>
                        <span
                          className={[
                            "inline-flex items-center gap-1 px-2 py-1 text-[0.68rem] font-black uppercase",
                            pass.packageId === featuredPackage.id
                              ? "bg-[#ffd447] text-[#102344]"
                              : "bg-[#102344] text-[#ffd447]",
                          ].join(" ")}
                        >
                          {pass.packageId === featuredPackage.id ? (
                            <Check className="size-3" />
                          ) : null}
                          Best deal
                        </span>
                        <span
                          data-poster="true"
                          className="mt-4 block text-5xl leading-[0.9]"
                        >
                          {featuredPackage.shortName}
                        </span>
                        <span className="mt-3 block max-w-2xl text-sm font-semibold leading-6">
                          {featuredPackage.description}
                        </span>
                      </span>
                      <span
                        data-poster="true"
                        className="mt-4 block text-5xl leading-none sm:mt-0"
                      >
                        {featuredPackage.priceLabel}
                      </span>
                    </button>
                  ) : null}

                  <p className="mx-auto inline-block w-fit bg-[#102344] px-3 py-1 text-center text-xs font-black uppercase text-[#ffd447] shadow-[4px_4px_0_#e6392e]">
                    Additional ticket options
                  </p>

                  <div className="grid gap-3 md:grid-cols-3">
                    {additionalPackages.map((ticketPackage) => {
                      const isSelected = pass.packageId === ticketPackage.id;

                      return (
                        <button
                          key={ticketPackage.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => updatePassPackage(pass.id, ticketPackage.id)}
                          className={[
                            "min-h-36 border-2 p-4 text-left shadow-[3px_3px_0_#102344] transition",
                            isSelected
                              ? "border-[#102344] bg-[#183a59] text-white"
                              : "border-[#102344]/70 bg-[#fff7e6]/80 text-[#102344] hover:bg-white",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "inline-flex items-center gap-1 px-3 py-1 text-base font-black uppercase leading-none",
                              isSelected
                                ? "bg-[#ffd447] text-[#102344]"
                                : "bg-[#102344] text-[#ffd447]",
                            ].join(" ")}
                          >
                            {isSelected ? <Check className="size-3" /> : null}
                            {ticketPackage.priceLabel}
                          </span>
                          <span
                            data-poster="true"
                            className="mt-4 block text-3xl leading-[0.92] text-current"
                          >
                            {ticketPackage.shortName}
                          </span>
                          <span className="mt-3 block text-sm font-semibold leading-6">
                            {ticketPackage.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </fieldset>

              {pass.packageId === "name-your-price" ? (
                <div className="mt-5 max-w-sm">
                  <MoneyInput
                    label="Pass contribution"
                    helperText="Choose an amount or enter your own."
                    value={pass.nameYourPriceDollars}
                    onChange={(value) =>
                      updatePass(pass.id, (currentPass) => ({
                        ...currentPass,
                        nameYourPriceDollars: value,
                      }))
                    }
                    presets={["3", "5", "7", "9"]}
                    defaultValue={DEFAULT_NAME_YOUR_PRICE_DOLLARS}
                    accent="yellow"
                  />
                </div>
              ) : null}

              {requirements.shirt || requirements.koozie ? (
                <div className="mt-5 border-4 border-[#102344] bg-[#ffd447] p-4 shadow-[5px_5px_0_#102344]">
                  <p className="inline-flex items-center gap-2 bg-[#102344] px-3 py-1 text-xs font-black uppercase text-[#ffd447]">
                    <Shirt className="size-4" />
                    Merch choices
                  </p>

                  {requirements.shirt ? (
                    <div className="mt-4 grid gap-5">
                      <OptionButtonGroup
                        label="Shirt style"
                        value={pass.shirtStyle}
                        options={shirtStyleOptions}
                        columns="grid-cols-2"
                        onChange={(value: ShirtStyle) =>
                          updatePass(pass.id, (currentPass) => ({
                            ...currentPass,
                            shirtStyle: value,
                          }))
                        }
                      />

                      <OptionButtonGroup
                        label="Shirt color"
                        value={pass.shirtColor}
                        options={shirtColorOptions}
                        columns="grid-cols-2"
                        onChange={(value: ShirtColor) =>
                          updatePass(pass.id, (currentPass) => ({
                            ...currentPass,
                            shirtColor: value,
                          }))
                        }
                      />

                      <OptionButtonGroup
                        label="Shirt size"
                        value={pass.shirtSize}
                        options={shirtSizeOptions}
                        columns="grid-cols-3 sm:grid-cols-6"
                        onChange={(value: ShirtSize) =>
                          updatePass(pass.id, (currentPass) => ({
                            ...currentPass,
                            shirtSize: value,
                          }))
                        }
                      />
                    </div>
                  ) : null}

                  {requirements.koozie ? (
                    <div className="mt-5 max-w-2xl">
                      <OptionButtonGroup
                        label="Koozie fit"
                        value={pass.koozieType}
                        options={koozieTypeOptions}
                        columns="grid-cols-1 sm:grid-cols-2"
                        onChange={(value: KoozieType) =>
                          updatePass(pass.id, (currentPass) => ({
                            ...currentPass,
                            koozieType: value,
                          }))
                        }
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {warnings.length ? (
                <div className="mt-5 border-4 border-[#102344] bg-white px-4 py-3 text-sm font-black text-[#e6392e] shadow-[4px_4px_0_#102344]">
                  {warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}

        <div className="flex flex-col gap-3 border-4 border-[#102344] bg-[#fff1c7] p-4 shadow-[8px_8px_0_#102344] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#102344]">
              Adding another guest?
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#344760]">
              Add another pass and choose that guest&apos;s package and merch.
            </p>
          </div>
          <Button
            type="button"
            onClick={addPass}
            disabled={!canAddPass}
            className="h-auto rounded-none border-4 border-[#102344] bg-[#2ec4f3] px-5 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-[#6fd8f7] disabled:translate-y-0 disabled:opacity-60"
          >
            <Plus className="size-4" />
            Add pass
          </Button>
        </div>

        <section className="border-4 border-[#102344] bg-[#fff1c7] p-4 text-[#102344] shadow-[8px_8px_0_#102344] lg:hidden">
          {orderSummary}
        </section>
      </div>

      <aside className="sticky top-36 hidden border-4 border-[#102344] bg-[#fff1c7] p-4 text-[#102344] shadow-[8px_8px_0_#102344] lg:block lg:p-5">
        {orderSummary}
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-[#102344] bg-[#fff1c7] px-4 py-3 text-[#102344] shadow-[0_-6px_0_rgba(16,35,68,0.16)] lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-[#344760]">
              {passes.length} {passes.length === 1 ? "pass" : "passes"}
            </p>
            <p data-poster="true" className="text-3xl leading-none text-[#102344]">
              {formatCents(totalCents)}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleCheckout}
            disabled={
              !isCheckoutEnabled ||
              isSubmitting ||
              !cartResult.success ||
              hasMissingSelections
            }
            className="h-auto shrink-0 rounded-none border-4 border-[#102344] bg-[#e6392e] px-4 py-3 text-xs font-black uppercase text-white shadow-[4px_4px_0_#102344] hover:bg-[#cf2f24] disabled:translate-y-0 disabled:opacity-60"
          >
            <CreditCard className="size-4" />
            {isCheckoutEnabled
              ? isSubmitting
                ? "Opening..."
                : "Checkout"
              : "Soon"}
          </Button>
        </div>
      </div>
    </div>
  );
}
