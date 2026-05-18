# Goal Setting & Tracking Portal

Enterprise application for managing employee goals, manager approvals, quarterly achievements, and audit trails.

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL and Redis)

### Setup

#### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
docker compose up -d
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

API runs at http://localhost:3001

#### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App runs at http://localhost:5173

### Demo Credentials

| Role     | Email              | Password     |
|----------|--------------------|--------------|
| Employee | demo@example.com   | password123  |
| Manager  | mgr@example.com    | password123  |
| Admin    | admin@example.com  | password123  |

Enable `DEMO_MODE=true` to switch roles from the header without re-login.

## Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, Prisma, PostgreSQL, Redis
- **Auth**: JWT + bcrypt

## Project Structure

- `frontend/` — React SPA
- `backend/` — Express API
- `docs/` — Architecture and API documentation

See `docs/api.md` for REST endpoints.

## Deploy (production)

### Option A — Docker (recommended)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. From the repo root:

```powershell
copy .env.production.example .env.production
# Edit .env.production — set JWT_SECRET and JWT_REFRESH_SECRET

.\scripts\deploy.ps1
```

3. Seed demo users (first time only), with Postgres running:

```powershell
cd backend
$env:DATABASE_URL="postgresql://postgres:password@localhost:5432/goal_setting_db"
npm run db:seed
```

| URL | Service |
|-----|---------|
| http://localhost | Frontend |
| http://localhost:3001/api/health | API |

Stop: `docker compose -f docker-compose.prod.yml down`

### Option B — Render (cloud, no local Docker)

1. Push the repo to GitHub.
2. In [Render](https://render.com), **New → Blueprint** and connect the repo (`render.yaml`).
3. Set `VITE_API_URL` on the static site to your API URL after deploy.
4. Run seed once against the Render Postgres URL (local machine): `cd backend && npm run db:seed`

Details: `docs/deployment.md`
