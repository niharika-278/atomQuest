import { PrismaClient, UserRole, ThrustArea, GoalStatus } from '@prisma/client';
import { hashPassword } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.achievement.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.cycle.deleteMany();
  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password_hash: await hashPassword('password123'),
      role: 'ADMIN' as UserRole
    }
  });

  const managerUser = await prisma.user.create({
    data: {
      email: 'mgr@example.com',
      name: 'Manager',
      password_hash: await hashPassword('password123'),
      role: 'MANAGER' as UserRole
    }
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Employee Demo',
      password_hash: await hashPassword('password123'),
      role: 'EMPLOYEE' as UserRole,
      manager_id: managerUser.id
    }
  });

  const goal1 = await prisma.goal.create({
    data: {
      employee_id: employeeUser.id,
      thrust_area: 'STRATEGIC' as ThrustArea,
      title: 'Sales Revenue Target',
      description: 'Achieve 500k in revenue',
      uom_type: 'MIN',
      target_value: 500000,
      weightage: 40,
      status: 'approved' as GoalStatus,
      is_locked: true,
      locked_at: new Date(),
      locked_by: managerUser.id,
      created_by: employeeUser.id
    }
  });

  const goal2 = await prisma.goal.create({
    data: {
      employee_id: employeeUser.id,
      thrust_area: 'QUALITY' as ThrustArea,
      title: 'Customer Satisfaction',
      description: 'Achieve 95% satisfaction',
      uom_type: 'MIN',
      target_value: 95,
      weightage: 30,
      status: 'approved' as GoalStatus,
      is_locked: true,
      locked_at: new Date(),
      locked_by: managerUser.id,
      created_by: employeeUser.id
    }
  });

  await prisma.goal.create({
    data: {
      employee_id: employeeUser.id,
      thrust_area: 'OPERATIONAL' as ThrustArea,
      title: 'Cost Optimization',
      description: 'Reduce costs by 15%',
      uom_type: 'MAX',
      target_value: 15,
      weightage: 20,
      status: 'approved' as GoalStatus,
      is_locked: true,
      locked_at: new Date(),
      locked_by: managerUser.id,
      created_by: employeeUser.id
    }
  });

  await prisma.goal.create({
    data: {
      employee_id: employeeUser.id,
      thrust_area: 'INNOVATION' as ThrustArea,
      title: 'Process Improvements',
      description: 'Implement 5 process improvements',
      uom_type: 'MIN',
      target_value: 5,
      weightage: 10,
      status: 'approved' as GoalStatus,
      is_locked: true,
      locked_at: new Date(),
      locked_by: managerUser.id,
      created_by: employeeUser.id
    }
  });

  await prisma.achievement.create({
    data: {
      goal_id: goal1.id,
      quarter_code: 'Q4_2024',
      actual_value: 480000,
      status: 'on_track',
      progress_score: 96,
      created_by: employeeUser.id
    }
  });

  await prisma.achievement.create({
    data: {
      goal_id: goal2.id,
      quarter_code: 'Q4_2024',
      actual_value: 94,
      status: 'on_track',
      progress_score: 99,
      created_by: employeeUser.id
    }
  });

  await prisma.cycle.create({
    data: {
      year: 2024,
      phase: 'q4_final',
      window_opens: new Date('2025-04-01'),
      window_closes: new Date('2025-04-30'),
      is_active: true,
      created_by: adminUser.id
    }
  });

  console.log('Seeding completed');
  console.log('\nDemo Credentials:');
  console.log('Employee: demo@example.com / password123');
  console.log('Manager: mgr@example.com / password123');
  console.log('Admin: admin@example.com / password123');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
