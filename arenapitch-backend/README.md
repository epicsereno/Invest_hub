# ArenaPitch Backend

Private NestJS API for ArenaPitch. The backend is organized by domain modules so pitch, arena, deal, notification, analytics, user, and auth logic can evolve independently.

## Architecture

- `src/common`: shared decorators, guards, filters, interceptors, and utilities.
- `src/config`: typed environment configuration.
- `src/database`: Prisma module and service.
- `src/modules/*`: self-contained feature modules.
- `prisma/schema.prisma`: core data model for users, pitches, arenas, offers, counters, and notifications.

## Quick Start

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

## Module Rules

- Controllers own HTTP shape only.
- Services own business logic.
- Repositories own persistence.
- Modules export only providers that other modules should consume.
- Cross-module dependencies should go through exported services, not repositories.

## Deal Module CQRS

`src/modules/deal` uses `@nestjs/cqrs` because offer negotiation has richer write flows than the rest of the app:

- Commands: make offer, counter offer, accept deal, withdraw offer.
- Queries: get deal, get pitch deals, get investor deals, get deal history.
- Events: deal made, offer countered, deal accepted, offer withdrawn.
- `DealService` remains as a facade for controllers or other modules that do not need direct bus access.

## Next Deep Dives

- Auth roles and investor verification.
- Deal negotiation state machine.
- Private arena access control and NDA workflow.
- Events for notifications, analytics, and real-time rooms.
