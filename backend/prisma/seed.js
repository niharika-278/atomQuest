const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password_hash: await bcrypt.hash('password123', 10),
      role: 'ADMIN'
    }
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });