# Deployment

## Docker Compose (production)

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Set environment variables for `JWT_SECRET`, `JWT_REFRESH_SECRET`, and database credentials.

## AWS (summary)

1. **RDS** — PostgreSQL 16
2. **ElastiCache** — Redis 7
3. **Elastic Beanstalk** — Node.js API (`backend/Dockerfile`)
4. **S3 + CloudFront** — static frontend (`frontend/Dockerfile` + `nginx.conf`)
5. **ACM** — TLS certificates

See CI workflow in `.github/workflows/ci-cd.yml` for build and test gates.
