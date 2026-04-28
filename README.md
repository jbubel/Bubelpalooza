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
5. Install dependencies:

```bash
npm install
```

6. Start the development server once the Next.js app is initialized:

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

## Deployment

- The intended hosting platform is Vercel.
- Pull requests and non-`main` branches should use Vercel preview deployments.
- The `main` branch should be the only branch that deploys to the production domain.
- Production domain target: `bubelpalooza.com`
- Preview URLs should be used for review instead of maintaining a separate shared staging domain at this stage.

### Vercel Setup

1. Create or open the Vercel project for this repository.
2. Connect the GitHub repository to Vercel.
3. Set the production branch to `main`.
4. Add the production domain `bubelpalooza.com`.
5. Allow Vercel to post preview deployment checks to pull requests.
6. Configure environment variables in Vercel rather than committing them.

### Hosted Environment Variables

- For the current frontend-only phase, `NEXT_PUBLIC_APP_URL` is the most important hosted value.
- In preview environments, set `NEXT_PUBLIC_APP_URL` to the preview deployment URL pattern you want to rely on, or manage it per-environment in Vercel.
- In production, set `NEXT_PUBLIC_APP_URL` to `https://bubelpalooza.com`.
- Add database, Stripe, Resend, Twilio, and Sentry values in Vercel only when those features are implemented.

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

## Near-Term Priorities

- Establish a strong public-facing site identity around the crawfish boil and pool party
- Build clear event-information pages for schedule, logistics, policies, and FAQs
- Support reliable ticket purchasing and post-purchase confirmation flows
- Add merchandise in a way that feels integrated with the event experience
- Create a codebase and deployment setup that can grow without becoming fragile
