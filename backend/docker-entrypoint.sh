
#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npm run db:seed

echo "Starting server..."
node dist/server.js