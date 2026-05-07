# Database Foundation

## Overview

The project uses Drizzle ORM with Neon Postgres.

This database layer includes:

- Drizzle config
- a lazy Neon database client
- a schema entry point for application tables
- npm scripts for migration and studio workflows

Schema tables and generated migrations are added as backend features are introduced.

## Environment Variables

The database foundation expects one of these variables when you run Drizzle commands or connect to the database at runtime:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`

Runtime app code requires at least one database URL at startup, prefers `DATABASE_URL` first, and falls back to `DATABASE_URL_UNPOOLED`.

Drizzle commands prefer `DATABASE_URL_UNPOOLED` first and fall back to `DATABASE_URL`.

## Local Setup

1. Create a Neon project.
2. Copy the pooled connection string into `DATABASE_URL`.
3. Copy the direct or unpooled connection string into `DATABASE_URL_UNPOOLED` when Neon provides one.
4. Keep real values in `.env.local` only.

## Commands

```bash
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

`db:generate` creates migration files from schema changes.

`db:migrate` applies generated migrations.

`db:push` is available for development workflows, but reviewed migration files should stay the normal path for production-oriented changes.

`db:studio` opens the Drizzle Studio interface.

## File Layout

- `drizzle.config.ts`: Drizzle Kit config and database env loading
- `lib/db/index.ts`: lazy Neon + Drizzle client access
- `lib/db/schema/index.ts`: schema entry point for application tables
- `drizzle/`: generated migration output
