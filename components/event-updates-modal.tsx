"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(window.localStorage.getItem(EVENT_UPDATES_STORAGE_KEYS.submittedAt));
  });
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
      "You are on the list. We will send announcements when tickets go on sale and when new event details are ready.",
    [],
  );

  function closeModal() {
    setIsOpen(false);
    window.localStorage.setItem(
      EVENT_UPDATES_STORAGE_KEYS.dismissedAt,
      String(Date.now()),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setRequestError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/event-updates-signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
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
      window.localStorage.setItem(
        EVENT_UPDATES_STORAGE_KEYS.submittedAt,
        String(Date.now()),
      );
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
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#101827]/78 px-4 py-4 sm:items-center sm:px-6">
      <div className="poster-panel relative w-full max-w-2xl border-4 border-[#102344] bg-[#ffd447] p-5 text-[#102344] shadow-[12px_12px_0_#102344] sm:p-8">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center border-2 border-[#102344] bg-[#fff7e6] text-[#102344] shadow-[3px_3px_0_#102344] hover:bg-white"
          aria-label="Close updates signup"
        >
          <X className="size-5" />
        </button>

        <div className="pr-12">
          <p className="inline-block bg-[#102344] px-3 py-1 text-xs font-black uppercase text-[#ffd447] shadow-[4px_4px_0_#e6392e]">
            Stay up to date
          </p>
          <h2 data-poster="true" className="mt-4 text-5xl leading-[0.88] text-[#e6392e] sm:text-6xl">
            GET ANNOUNCEMENTS
          </h2>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#24344d] sm:text-lg">
            Be first to hear when tickets go on sale and when Bubelpalooza shares
            lineup, merch, and day-of updates.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-6 border-4 border-[#102344] bg-[#fff7e6] p-5 shadow-[8px_8px_0_#102344]">
            <p className="text-lg font-black uppercase text-[#102344]">You are on the list</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#344760]">
              {successMessage}
            </p>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 h-auto rounded-none border-4 border-[#102344] bg-[#2ec4f3] px-6 py-3 text-sm font-black uppercase text-[#102344] shadow-[5px_5px_0_#102344] hover:bg-[#6fd8f7]"
            >
              Back to the party
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase text-[#102344]">
                  First name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                  className="w-full border-4 border-[#102344] bg-[#fff7e6] px-4 py-3 text-base font-semibold text-[#102344] shadow-[5px_5px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white"
                  autoComplete="given-name"
                />
                {fieldErrors.firstName?.[0] ? (
                  <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                    First name {fieldErrors.firstName[0]}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase text-[#102344]">
                  Last name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                  className="w-full border-4 border-[#102344] bg-[#fff7e6] px-4 py-3 text-base font-semibold text-[#102344] shadow-[5px_5px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white"
                  autoComplete="family-name"
                />
                {fieldErrors.lastName?.[0] ? (
                  <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                    Last name {fieldErrors.lastName[0]}
                  </span>
                ) : null}
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-black uppercase text-[#102344]">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full border-4 border-[#102344] bg-[#fff7e6] px-4 py-3 text-base font-semibold text-[#102344] shadow-[5px_5px_0_#102344] outline-none placeholder:text-[#5f6f86] focus:bg-white"
                autoComplete="email"
              />
              {fieldErrors.email?.[0] ? (
                <span className="mt-2 block text-sm font-bold text-[#e6392e]">
                  Email {fieldErrors.email[0]}
                </span>
              ) : null}
            </label>

            {requestError ? (
              <p className="border-4 border-[#102344] bg-[#fff7e6] px-4 py-3 text-sm font-bold text-[#e6392e] shadow-[5px_5px_0_#102344]">
                {requestError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm font-semibold leading-6 text-[#344760]">
                Sign up once and stay in the loop for ticket on-sale announcements and
                key event updates.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-auto rounded-none border-4 border-[#102344] bg-[#e6392e] px-6 py-3 text-sm font-black uppercase text-white shadow-[5px_5px_0_#102344] hover:bg-[#cf2f24] disabled:translate-y-0 disabled:opacity-100"
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
