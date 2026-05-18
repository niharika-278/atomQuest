# Database Schema

PostgreSQL via Prisma. Key entities:

- **User** — employees, managers, admins; `manager_id` self-relation
- **Goal** — thrust area, UoM, weightage, status, lock fields
- **Achievement** — per goal + quarter; unique `(goal_id, quarter_code)`
- **CheckIn** — employee/manager/quarter conversations
- **AuditLog** — entity type/id, action, JSON snapshots
- **Cycle** — performance year phases and windows

See `backend/prisma/schema.prisma` for full definitions and indexes.
