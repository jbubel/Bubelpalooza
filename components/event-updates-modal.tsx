"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EVENT_UPDATES_AUTO_OPEN_DELAY_MS,
  EVENT_UPDATES_DISMISS_DAYS,
  EVENT_UPDATES_MODAL_EVENT,
  EVENT_UPDATES_STORAGE_KEYS,
} from "@/lib/event-updates/constants";

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email", string[]>>;

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
};

type FormField = keyof typeof initialFormState;

function getFormString(formData: FormData, field: FormField) {
  const value = formData.get(field);

  return typeof value === "string" ? value : "";
}

function hasDismissalExpired(timestamp: string | null) {
  if (!timestamp) {
    return true;
  }

  const dismissedAt = Number(timestamp);

  if (Number.isNaN(dismissedAt)) {
    return true;
  }

  return Date.now() - dismissedAt > EVENT_UPDATES_DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export function EventUpdatesModal() {
  const titleId = useId();
  const descriptionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    const openModal = () => {
      setRequestError(null);
      setFieldErrors({});
      setIsOpen(true);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener(EVENT_UPDATES_MODAL_EVENT, openModal);
    window.addEventListener("keydown", closeOnEscape);

    let timeout: number | null = null;

    if (!isSubmitted) {
      timeout = window.setTimeout(() => {
        const dismissedAt = window.localStorage.getItem(EVENT_UPDATES_STORAGE_KEYS.dismissedAt);

        if (hasDismissalExpired(dismissedAt)) {
          setIsOpen(true);
        }
      }, EVENT_UPDATES_AUTO_OPEN_DELAY_MS);
    }

    return () => {
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
      window.removeEventListener(EVENT_UPDATES_MODAL_EVENT, openModal);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, isSubmitted]);

  const successMessage = useMemo(
    () =>
      "As a reminder, Bubelpalooza is Sunday, May 24, 2026 at Bubel Beach Club in Leander, TX. The pool opens at 12 PM, and we will share more details as they are ready.",
    [],
  );

  function closeModal() {
    setIsOpen(false);
    window.localStorage.setItem(
      EVENT_UPDATES_STORAGE_KEYS.dismissedAt,
      String(Date.now()),
    );
  }

  function updateFormValue(field: FormField, value: string) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (fieldErrors[field]?.length) {
      setFieldErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    if (requestError) {
      setRequestError(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submittedValues = {
      firstName: getFormString(formData, "firstName"),
      lastName: getFormString(formData, "lastName"),
      email: getFormString(formData, "email"),
    };

    setIsSubmitting(true);
    setRequestError(null);
    setFieldErrors({});
    setFormValues(submittedValues);

    try {
      const response = await fetch("/api/event-updates-signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submittedValues,
          source: "site-modal",
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setRequestError(data.message ?? "Please try again.");
        return;
      }

      setIsSubmitted(true);
      setIsOpen(true);
      window.localStorage.removeItem(EVENT_UPDATES_STORAGE_KEYS.dismissedAt);
    } catch {
      setRequestError("We could not save your signup right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#101827]/78 px-4 py-4 sm:items-center sm:px-6 sm:py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="poster-panel relative mx-auto max-h-[calc(100dvh-2rem)] w-full min-w-0 max-w-[25rem] overflow-y-auto border-4 border-[#102344] bg-[#ffd447] p-4 text-[#102344] shadow-[6px_6px_0_#102344] sm:max-h-[calc(100vh-3rem)] sm:max-w-2xl sm:p-8 sm:shadow-[12px_12px_0_#102344]"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-2 top-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-[#102344] bg-[#fff7e6] text-[#102344] shadow-[3px_3px_0_#102344] hover:bg-white sm:right-3 sm:top-3 sm:h-11 sm:w-11"
          aria-label="Close updates signup"
        >
          <X className="size-5" />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="inline-block bg-[#102344] px-3 py-1 text-[0.7rem] font-black uppercase text-[#ffd447] shadow-[4px_4px_0_#e6392e] sm:text-xs">
            Stay up to date
          </p>
          <h2
            id={titleId}
            data-poster="true"
            className="mt-3 text-[2.4rem] leading-[0.88] text-[#e6392e] sm:mt-4 sm:text-6xl"
          >
            <span className="block sm:inline">GET</span>{" "}
            <span className="block sm:inline">ANNOUNCEMENTS</span>
          </h2>
          <p
            id={descriptionId}
            className="mt-3 max-w-xl text-sm font-semibold leading-6 text-[#24344d] sm:mt-4 sm:text-lg sm:leading-7"
          >
            Be first to hear when tickets go on sale and when Bubelpalooza shares
            lineup, merch, and day-of updates.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-4 border-4 border-[#102344] bg-[#fff7e6] p-4 shadow-[6px_6px_0_#102344] sm:mt-6 sm:p-5 sm:shadow-[8px_8px_0_#102344]">
            <p className="text-lg font-black uppercase text-[#102344]">Thanks for your interest</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#344760] sm:text-base sm:leading-7">
              {successMessage}
            </p>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 h-auto w-full rounded-none border-4 border-[#102344] bg-[#2ec4f3] px-6 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-[#6fd8f7] sm:w-auto"
            >
              Back to the party
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-black uppercase text-[#102344] sm:mb-2 sm:text-sm">
                  First name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={(event) => updateFormValue("firstName", event.target.value)}
                  onInput={(event) =>
                    updateFormValue("firstName", event.currentTarget.value)
                  }
                  className="w-full border-4 border-[#102344] bg-[#fff7e6] px-3 py-2.5 text-base font-semibold text-[#102344] shadow-[4px_4px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white sm:px-4 sm:py-3 sm:shadow-[5px_5px_0_#102344]"
                  autoComplete="given-name"
                  required
                  aria-invalid={Boolean(fieldErrors.firstName?.[0])}
                />
                {fieldErrors.firstName?.[0] ? (
                  <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                    First name {fieldErrors.firstName[0]}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-black uppercase text-[#102344] sm:mb-2 sm:text-sm">
                  Last name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={(event) => updateFormValue("lastName", event.target.value)}
                  onInput={(event) =>
                    updateFormValue("lastName", event.currentTarget.value)
                  }
                  className="w-full border-4 border-[#102344] bg-[#fff7e6] px-3 py-2.5 text-base font-semibold text-[#102344] shadow-[4px_4px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white sm:px-4 sm:py-3 sm:shadow-[5px_5px_0_#102344]"
                  autoComplete="family-name"
                  required
                  aria-invalid={Boolean(fieldErrors.lastName?.[0])}
                />
                {fieldErrors.lastName?.[0] ? (
                  <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                    Last name {fieldErrors.lastName[0]}
                  </span>
                ) : null}
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-black uppercase text-[#102344] sm:mb-2 sm:text-sm">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={(event) => updateFormValue("email", event.target.value)}
                onInput={(event) => updateFormValue("email", event.currentTarget.value)}
                className="w-full border-4 border-[#102344] bg-[#fff7e6] px-3 py-2.5 text-base font-semibold text-[#102344] shadow-[4px_4px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white sm:px-4 sm:py-3 sm:shadow-[5px_5px_0_#102344]"
                autoComplete="email"
                inputMode="email"
                required
                aria-invalid={Boolean(fieldErrors.email?.[0])}
              />
              {fieldErrors.email?.[0] ? (
                <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                  Email {fieldErrors.email[0]}
                </span>
              ) : null}
            </label>

            {requestError ? (
              <p className="border-4 border-[#102344] bg-[#fff7e6] px-3 py-2.5 text-sm font-bold text-[#e6392e] shadow-[4px_4px_0_#102344] sm:px-4 sm:py-3 sm:shadow-[5px_5px_0_#102344]">
                {requestError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs font-semibold leading-5 text-[#344760] sm:text-sm sm:leading-6">
                Sign up once and stay in the loop for ticket on-sale announcements and
                key event updates.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-auto w-full rounded-none border-4 border-[#102344] bg-[#e6392e] px-6 py-3 text-sm font-black uppercase text-white shadow-[5px_5px_0_#102344] hover:bg-[#cf2f24] disabled:translate-y-0 disabled:opacity-100 sm:w-auto"
              >
                {isSubmitting ? "Saving..." : "Get announcements"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
