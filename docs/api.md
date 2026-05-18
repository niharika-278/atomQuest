# API Reference

Base URL: `http://localhost:3001/api`

## Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | No | Login |
| POST | `/auth/refresh` | Yes | Refresh access token |
| POST | `/auth/demo/switch-role` | Yes | Demo role switch |

## Goals

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/goals` | Employee+ | Create goal |
| GET | `/goals/my-goals` | Employee+ | List own goals |
| GET | `/goals/pending-approvals` | Manager+ | Pending team goals |
| POST | `/goals/approve` | Manager+ | Approve/reject |

## Achievements

| Method | Path | Description |
|--------|------|-------------|
| POST | `/achievements` | Log quarterly achievement |
| GET | `/achievements/quarterly?quarter_code=` | Goals + achievements |

## Admin

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/admin/users` | User management |
| PATCH | `/admin/users/:id/toggle` | Activate/deactivate |
| GET | `/admin/audit-logs` | Audit trail |
| GET/POST | `/admin/cycles` | Cycle management |
| PATCH | `/admin/cycles/:id/activate` | Set active cycle |

## Reports

| Method | Path | Role |
|--------|------|------|
| GET | `/reports/completion` | Manager+ |
| GET | `/reports/achievements` | Manager+ |

## Health

`GET /api/health` → `{ status: "ok" }`
