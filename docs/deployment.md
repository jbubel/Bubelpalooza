# Deployment

## Goal

Use Vercel preview deployments for pull request review and deploy production only from `main` to `bubelpalooza.com`.

## Intended Model

- Pull request branches get their own Vercel preview deployment
- GitHub pull requests show a preview URL for review
- The `main` branch deploys to `bubelpalooza.com`
- No shared staging domain is required at this stage

## What Lives In The Repo

- Deployment expectations and workflow documentation
- `.env.example` placeholders
- App code that builds cleanly in production mode

## What Should Not Live In The Repo

- Real production secrets
- Vercel access tokens
- Downloaded environment exports
- Generated local Vercel config that contains project-specific values unless intentionally reviewed

## Manual Vercel Setup

1. Create or select the Vercel project.
2. Import the GitHub repository.
3. Confirm the framework is detected as Next.js.
4. Set the production branch to `main`.
5. Add `bubelpalooza.com` as the production domain.
6. Confirm preview deployments are enabled for pull requests.
7. Add hosted environment variables in Vercel.

## Hosted Environment Variables

### Current Frontend-Only Minimum

- `NEXT_PUBLIC_APP_URL`

### Future Values

Add these in Vercel when the related features are implemented:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

## Review Workflow

1. Push a feature branch.
2. Open a pull request.
3. Wait for the Vercel preview deployment to appear on the pull request.
4. Review the preview URL before merge.
5. Merge to `main` when approved.
6. Let Vercel deploy production from `main`.
