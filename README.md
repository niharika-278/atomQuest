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

#### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Demo Credentials

| Role     | Email              | Password     |
|----------|--------------------|--------------|
| Employee | demo@example.com   | password123  |
| Manager  | mgr@example.com    | password123  |
| Admin    | admin@example.com  | password123  |



## Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, Prisma, PostgreSQL, Redis
- **Auth**: JWT + bcrypt

## Project Structure

- `frontend/` — React SPA
- `backend/` — Express API
- `docs/` — Architecture and API documentation

See `docs/api.md` for REST endpoints.


