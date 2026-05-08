# Notification Flows

## Overview

Bubelpalooza uses Resend for transactional email sent by the application.

Notification provider credentials belong in local `.env.local` files and hosted environment variable stores. Real API keys, subscriber lists, exports, message logs, and provider payloads must not be committed to the repository.

## Event Updates Welcome Email

The event updates signup endpoint stores a valid signup before attempting email delivery. A newly created signup triggers one welcome email through a hosted Resend template. A duplicate signup reuses the existing subscription record and does not send another welcome email.

The actual welcome email subject, HTML, text fallback, and visual design live in Resend rather than in this public repository. Keep the template highly branded and guest-facing, following the durable event direction in `docs/theme.md`: yellow-forward, bold, poster/flyer inspired, and celebratory of crawfish, the pool, live music, merch, and community together.

Template IDs are provider identifiers, not secrets. Keep them in the committed registry at `lib/notifications/resend-templates.ts` so adding future templates does not require a new environment variable per email flow.

The application sends the registry template ID and this variable contract:

- `GUEST_FIRST_NAME`: subscriber first name for greeting and light personalization. The application strips characters that could be interpreted as HTML markup before sending this value to Resend.

Do not commit finished email HTML, copied provider templates, subscriber examples, message screenshots, or provider exports to the repository. For reviews, use Resend previews, provider test sends, or private screenshots stored outside the repo.

## Required Environment Variables

- `RESEND_API_KEY`: Resend API key used by the server-side send path.
- `RESEND_FROM_EMAIL`: Verified sender email address configured for Resend. A friendly sender format such as `Bubelpalooza <hello@updates.bubelpalooza.com>` is supported.

These values are read only on the server. Use `.env.local` for local development and Vercel environment variables for preview and production deployments.

The application validates `RESEND_API_KEY` and `RESEND_FROM_EMAIL` during server environment startup, so production builds fail clearly if either value is not configured. A committed hosted template ID is required for the welcome email send attempt; if it is missing, signup capture still succeeds and the email path is skipped with a coarse operational warning.

## Failure Behavior

Signup persistence remains the primary path. If the hosted template ID is missing, Resend is unavailable, Resend is rate limited, or Resend returns an error, the application keeps the saved signup and returns the normal signup success response to the browser.

Missing Resend provider credentials are treated as invalid application configuration and fail fast during server environment startup.

Email failures are logged as coarse operational warnings without raw subscriber names, email addresses, request payloads, or provider response bodies.

## Event Updates SMS Enrollment

The public updates signup form can also capture an optional phone number for guests who explicitly opt into text updates. Phone numbers are normalized to a US E.164-style value before storage. A phone number without SMS consent is rejected, and SMS consent without a phone number is rejected.

SMS enrollment is captured as application data only in this implementation. The signup endpoint does not send text messages yet, so Twilio credentials are not required for this flow. Future SMS sending work should use the stored normalized phone number and consent metadata, and should stay isolated from the Resend welcome email path.

Consent metadata stored with the signup includes the consent timestamp, the form source, and the consent copy version. When consent copy changes materially, update the committed consent copy version so future records remain reviewable.

Duplicate email submissions reuse the existing signup record. If an existing email-only signup later submits a phone number with explicit SMS consent, the existing record is updated with the phone enrollment details. A phone number already attached to another signup is not attached again.

## Subscriber Data Handling

Subscriber first name, last name, email address, optional phone number, consent metadata, source, and subscription status are stored in the application database for legitimate operational messaging use.

Public responses should return only the minimum status needed by the browser. Subscriber data should not be exposed through client-side code, fixtures, screenshots, public logs, or casual developer-facing surfaces.
