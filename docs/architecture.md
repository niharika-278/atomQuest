# Architecture

## Overview

Monorepo with a React SPA and Express REST API backed by PostgreSQL. Redis is provisioned for future job queues (BullMQ) and caching.

```
Browser → Vite (dev) / Nginx (prod) → Express API → Prisma → PostgreSQL
                                              ↘ Redis (queues/cache)
```

## Core Domains

| Domain        | Responsibility                                      |
|---------------|-----------------------------------------------------|
| Auth          | JWT access/refresh, RBAC, demo role switching       |
| Goals         | CRUD, weightage rules, manager approval, locking      |
| Achievements  | Quarterly actuals, progress score by UoM type       |
| Admin         | Users, cycles, audit log                            |
| Reports       | Completion and achievement summaries                  |

## Security

- Helmet, CORS, bcrypt password hashing
- Role middleware on routes (`EMPLOYEE`, `MANAGER`, `ADMIN`)
- Audit events on goal and achievement mutations

## Progress Score (UoM)

| Type     | Formula              |
|----------|----------------------|
| MIN      | actual / target × 100 |
| MAX      | target / actual × 100 |
| TIMELINE | 100 if actual ≤ target date |
| ZERO     | 100 if actual = 0    |

Scores are clamped to 0–100%.
