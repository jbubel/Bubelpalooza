# AGENTS.md

## Preferred Stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS with shadcn/ui
- Validation: Zod
- Database: Neon Postgres with Drizzle ORM
- Payments: Stripe Checkout with Stripe webhooks
- Email: Resend
- SMS: Twilio
- Hosting: Vercel
- Monitoring: Sentry

## Coding Conventions

- Prefer simple, conventional folder structures and server-first patterns.
- Use TypeScript strictly and avoid `any` unless there is a documented reason.
- Keep components small and focused.
- Validate external input with Zod at boundaries.
- Prefer clear naming over abstractions that hide behavior.
- Keep styling consistent with Tailwind utilities and shadcn/ui primitives.
- Add comments only when code intent is not obvious.

## AI Agent Instructions

- Optimize for maintainability, clarity, and safe iteration in a public repository.
- Do not overbuild. Ship the smallest useful version of each feature.
- Prefer App Router conventions, server actions or route handlers where appropriate, and well-scoped utilities.
- Before adding a dependency or external service, confirm it is already approved by project direction or clearly justified.
- Treat this repo as public-facing documentation as well as code. Leave clear docs when setup or behavior may not be obvious.

## Branch And Git Workflow

- Never implement work directly on `main`.
- Always create or switch to a task-specific branch before making code changes.
- Prefer branch names like `feature/issue-9-stripe-checkout`, `fix/issue-14-email-confirmation`, or `chore/ci-setup`.
- Open a pull request for every change set instead of pushing directly to `main`.
- Treat merges to `main` as the trigger point for production-oriented builds and releases.
- Keep history linear. Prefer squash merges or rebase-based merges, and avoid merge commits that create non-linear history.
- Before opening or updating a pull request, rebase onto the latest `main` when needed rather than merging `main` into the feature branch.
- Local commits to `main` are blocked by the repo hook and should be treated as a workflow violation.

## Secrets And Environment Variable Rules

- Never commit real secrets, tokens, API keys, signing secrets, or production configuration values.
- Commit only `.env.example` placeholders.
- Use `.env.local` for local development and platform-managed environment variables for hosted environments.
- If a value looks sensitive, keep it out of logs, screenshots, fixtures, tests, and docs.
- If a secret is exposed, rotate it immediately and update affected systems.

## Database And Migration Guidance

- Use Drizzle ORM with Neon Postgres.
- Keep schema definitions explicit and easy to review.
- Store migrations in version control once the app scaffold is added.
- Never commit production data, database dumps, or customer exports.
- Seed data, if added later, must be fake and clearly marked as non-production.
- Favor additive migrations and reversible rollout planning when practical.

## Payments, Email, And SMS Guidance

- Use Stripe Checkout rather than custom card handling.
- Verify Stripe webhook signatures before processing events.
- Persist only the minimum order and attendee data needed for operations.
- Use Resend for transactional email such as confirmations and reminders.
- Use Twilio only for clearly opted-in SMS messaging.
- Avoid sending secrets or sensitive personal data in email or SMS content.
- Keep provider-specific logic isolated so it is easy to test and replace.

## Testing And Validation Expectations

- Validate request payloads, webhook payloads, and environment configuration.
- Add tests around critical purchase, confirmation, and webhook flows as the app is built.
- Prefer lightweight automated coverage for business-critical logic over broad but shallow tests.
- Confirm failure paths for invalid input, failed payments, and provider outages.
- Run linting, type checks, and tests before merging meaningful feature work once project scripts exist.
