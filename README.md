# Weekly Clarity MVP

TypeScript monorepo for the Manager Weekly Clarity MVP.

## What is in this repo

- `backend`: NestJS API
- `frontend`: Next.js app
- `workers`: background jobs (BullMQ + Redis)
- `docker-compose.yml`: local Postgres/Redis + app containers

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## Quick start (recommended)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Create env files

```bash
cp backend/.env.example backend/.env
cp workers/.env.example workers/.env
```

### 3) Start infrastructure (Postgres + Redis)

```bash
docker compose up -d postgres redis
```

### 4) Run the app locally

Run each service in a separate terminal:

```bash
# Terminal 1: backend API
cd backend && pnpm dev
```

```bash
# Terminal 2: frontend (explicit port to avoid conflict with backend)
cd frontend && pnpm dev -- -p 3001
```

```bash
# Terminal 3: workers
cd workers && pnpm dev
```

## URLs

- Backend API: http://localhost:3000
- Frontend: http://localhost:3001
- Example frontend route: http://localhost:3001/onboarding

## Run with Docker Compose (current status)

```bash
docker compose up -d --build
docker compose ps
```

Notes:
- Compose currently starts all containers successfully.
- `frontend` now runs Next.js and serves http://localhost:3001/ in Compose.
- `backend` and `workers` still use placeholder container commands, so they do **not** run full app logic yet.
- For active development, use the local run flow above.

## Useful commands

```bash
# From repo root
pnpm build
pnpm lint
pnpm test
```

```bash
# Stop all compose services
docker compose down
```
