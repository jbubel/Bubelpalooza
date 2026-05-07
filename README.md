# Bubelpalooza

## Project Overview

Bubelpalooza is a public-facing web app for a family crawfish boil, pool party, and live music event at Bubel Beach Club. The product vision is a polished, full-featured event site that can handle public event information, ticketing, merchandise, operational messaging, and dependable post-purchase flows.

This repository is being built iteratively, but the long-term goal is a robust, production-ready platform rather than a narrow one-off MVP.

## Product Scope

- Public event site with schedule, location, parking, FAQ, policies, and attendee guidance
- Ticketing flow for admission and event-related purchase options
- Merchandise browsing and checkout support
- Order confirmation and attendee communication flows
- Optional SMS reminders and event updates for opted-in guests
- Operationally safe integrations for payments, notifications, monitoring, and admin workflows

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod
- Drizzle ORM
- Neon Postgres
- Stripe Checkout and Stripe webhooks
- Resend for transactional email
- Twilio for SMS
- Sentry for monitoring
- Vercel for hosting
- GitHub Issues and Projects for planning and delivery tracking

## Local Development Setup

1. Install Node.js 24 LTS or newer.
2. Install your package manager of choice. `npm` is the simplest default.
3. Copy `.env.example` to `.env.local`.
4. Fill in local development values only. Do not use production secrets in local files.
5. Install dependencies:

```bash
npm install
```

6. Start the development server:

```bash
npm run dev
```

## Development Workflow

- Start new implementation work from a GitHub issue. If no issue exists yet, create one before coding.
- Update local `main` from the latest remote `main` before creating a new task branch.
- Treat `main` as a protected branch.
- Create a new branch for each issue or focused unit of work.
- Open a pull request for changes instead of committing directly to `main`.
- Link the related issue in the pull request. Use `Closes #...` when the PR fully completes the issue, or `Refs #...` when it does not.
- Keep commit history linear by preferring squash merges or rebase-based merges.
- Delete feature branches after merge.
- Use merges to `main` as the trigger for production-oriented build and deploy workflows.

## Environment Variable Guidance

- `.env.example` is the only env file that should be committed.
- Real values belong in untracked files such as `.env.local`.
- Production secrets should be stored in the deployment platform, not in the repository.
- Use separate values for local, preview, and production environments whenever possible.
- Rotate any secret immediately if it is ever exposed.
- Public env reads should go through `lib/env/public.ts`.
- Server-only env reads should go through `lib/env/server.ts`.
- Empty provider values can stay unset until they are needed, but malformed configured values should fail fast.
- When a deployed feature depends on environment variables, those variables should become required configuration and should fail the application at startup if they are missing.
- `NEXT_PUBLIC_APP_URL` is the local/non-Vercel override for the app base URL.
- On Vercel, preview and production deployments can derive the app URL from Vercel system environment variables when those are enabled in project settings.
- At least one of `DATABASE_URL` or `DATABASE_URL_UNPOOLED` must be configured for deployed environments because database-backed features fail fast at startup.

## Deployment

- The intended hosting platform is Vercel.
- Pull requests and non-`main` branches should use Vercel preview deployments.
- The `main` branch should be the only branch that deploys to the production domain.
- Production domain target: `bubelpalooza.com`
- Preview URLs should be used for review instead of maintaining a separate shared staging domain.

### Vercel Setup

1. Create or open the Vercel project for this repository.
2. Connect the GitHub repository to Vercel.
3. Set the production branch to `main`.
4. Add the production domain `bubelpalooza.com`.
5. Allow Vercel to post preview deployment checks to pull requests.
6. Configure environment variables in Vercel rather than committing them.

### Hosted Environment Variables

- `NEXT_PUBLIC_APP_URL` is the primary hosted value for app URL and metadata configuration.
- In preview environments, set `NEXT_PUBLIC_APP_URL` to the preview deployment URL pattern you want to rely on, or manage it per-environment in Vercel.
- In production, set `NEXT_PUBLIC_APP_URL` to `https://bubelpalooza.com`.
- Add database, Stripe, Resend, Twilio, and Sentry values in Vercel when those services are used by the application.

### Deployment Workflow

- Feature branches open pull requests and receive Vercel preview deployments.
- Reviewers use the preview URL attached to the pull request for QA and design review.
- Merges to `main` trigger the production deployment.
- Keep preview and production configuration separate where values differ.

## Security And Data Handling

- Do not commit secrets, API keys, webhook signing secrets, exports, or customer data.
- Do not store unnecessary personal data. Keep attendee data collection minimal.
- Prefer hosted checkout and provider-managed security features over custom payment handling.
- Validate all incoming webhook payloads and user input.
- Treat this repository as fully public at all times.

## Project Intent

This project is intended to become a dependable, full-featured home for the event online. The site should make it easy for guests to understand what Bubelpalooza is, plan their attendance, buy tickets, shop merchandise, and receive clear follow-up communication.

The product should feel polished and welcoming while staying operationally simple behind the scenes. That means favoring secure hosted integrations, clear content structure, minimal data collection, and implementation choices that are easy to maintain over time.

## Design Direction

The durable visual and copy direction lives in [`docs/theme.md`](docs/theme.md). Frontend work should follow the yellow-forward, poster/flyer-inspired Bubelpalooza direction captured there rather than drifting toward generic SaaS or conference-page patterns.

## Backend Notes

Database setup details live in [`docs/database.md`](docs/database.md).

## Near-Term Priorities

- Establish a strong public-facing site identity around the crawfish boil and pool party
- Build clear event-information pages for schedule, logistics, policies, and FAQs
- Support reliable ticket purchasing and post-purchase confirmation flows
- Add merchandise in a way that feels integrated with the event experience
- Create a codebase and deployment setup that can grow without becoming fragile
