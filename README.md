# Bubelpalooza

## Project Overview

Bubelpalooza is a public-facing web app for a family crawfish boil and pool party with a mini music showcase as a supporting part of the experience. The product vision is a polished, full-featured event site that can handle public event information, ticketing, merchandise, operational messaging, and dependable post-purchase flows.

This repository is being built iteratively, but the long-term goal is a robust, production-ready platform rather than a narrow one-off MVP.

## Product Scope

- Public event site with schedule, location, parking, FAQ, policies, and attendee guidance
- Ticketing flow for admission and event-related purchase options
- Merchandise browsing and checkout support
- Order confirmation and attendee communication flows
- Optional SMS reminders and event updates for opted-in guests
- Operationally safe integrations for payments, notifications, monitoring, and future admin workflows

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
5. Install dependencies after the app scaffold is added:

```bash
npm install
```

6. Start the development server once the Next.js app is initialized:

```bash
npm run dev
```

## Development Workflow

- Treat `main` as a protected branch.
- Create a new branch for each issue or focused unit of work.
- Open a pull request for changes instead of committing directly to `main`.
- Keep commit history linear by preferring squash merges or rebase-based merges.
- Use merges to `main` as the trigger for production-oriented build and deploy workflows.

## Environment Variable Guidance

- `.env.example` is the only env file that should be committed.
- Real values belong in untracked files such as `.env.local`.
- Production secrets should be stored in the deployment platform, not in the repository.
- Use separate values for local, preview, and production environments whenever possible.
- Rotate any secret immediately if it is ever exposed.

## Security And Data Handling

- Do not commit secrets, API keys, webhook signing secrets, exports, or customer data.
- Do not store unnecessary personal data. Keep attendee data collection minimal.
- Prefer hosted checkout and provider-managed security features over custom payment handling.
- Validate all incoming webhook payloads and user input.
- Treat this repository as fully public at all times.

## Project Intent

This project is intended to become a dependable, full-featured home for the event online. The site should make it easy for guests to understand what Bubelpalooza is, plan their attendance, buy tickets, shop merchandise, and receive clear follow-up communication.

The product should feel polished and welcoming while staying operationally simple behind the scenes. That means favoring secure hosted integrations, clear content structure, minimal data collection, and implementation choices that are easy to maintain over time.

## Near-Term Priorities

- Establish a strong public-facing site identity around the crawfish boil and pool party
- Build clear event-information pages for schedule, logistics, policies, and FAQs
- Support reliable ticket purchasing and post-purchase confirmation flows
- Add merchandise in a way that feels integrated with the event experience
- Create a codebase and deployment setup that can grow without becoming fragile
