import prisma from '../db/prisma';
import { GoalStatus, ThrustArea, UoMType } from '@prisma/client';
import logger from '../utils/logger';
import * as auditService from './audit.service';

export interface CreateGoalInput {
  employee_id: string;
  thrust_area: string;
  title: string;
  description?: string;
  uom_type: string;
  target_value: number;
  weightage: number;
}

export async function createGoal(input: CreateGoalInput, createdBy: string) {
  const existingGoals = await prisma.goal.findMany({
    where: {
      employee_id: input.employee_id,
      status: { in: ['draft', 'pending_approval', 'approved'] }
    }
  });

  if (existingGoals.length >= 8) {
    throw new Error('Maximum 8 goals allowed per employee');
  }

  const totalWeightage =
    existingGoals.reduce((sum, g) => sum + Number(g.weightage), 0) + input.weightage;

  if (input.weightage < 10) {
    throw new Error('Minimum weightage: 10%');
  }

  if (totalWeightage > 100) {
    throw new Error(`Weightage would exceed 100% (current: ${totalWeightage}%)`);
  }

  const goal = await prisma.goal.create({
    data: {
      employee_id: input.employee_id,
      thrust_area: input.thrust_area as ThrustArea,
      title: input.title,
      description: input.description,
      uom_type: input.uom_type as UoMType,
      target_value: input.target_value,
      weightage: input.weightage,
      status: 'pending_approval',
      created_by: createdBy
    }
  });

  await auditService.logAuditEvent({
    entity_type: 'goals',
    entity_id: goal.id,
    action: 'create',
    changed_by: createdBy,
    new_value: goal
  });

  logger.info(`Goal created: ${goal.id} for employee ${input.employee_id}`);
  return goal;
}

export async function approveGoal(
  goalId: string,
  approverId: string,
  action: 'approve' | 'reject'
) {
  const goal = await prisma.goal.findUnique({ where: { id: goalId } });
  if (!goal) {
    throw new Error('Goal not found');
  }

  if (action === 'approve') {
    const updated = await prisma.goal.update({
      where: { id: goalId },
      data: {
        status: 'approved',
        is_locked: true,
        locked_at: new Date(),
        locked_by: approverId
      }
    });

    await auditService.logAuditEvent({
      entity_type: 'goals',
      entity_id: goalId,
      action: 'approve',
      changed_by: approverId,
      previous_value: goal,
      new_value: updated
    });

    logger.info(`Goal approved and locked: ${goalId}`);
    return updated;
  }

  const updated = await prisma.goal.update({
    where: { id: goalId },
    data: { status: 'rejected' }
  });

  await auditService.logAuditEvent({
    entity_type: 'goals',
    entity_id: goalId,
    action: 'reject',
    changed_by: approverId,
    previous_value: goal,
    new_value: updated
  });

  logger.info(`Goal rejected: ${goalId}`);
  return updated;
}

export async function getEmployeeGoals(employeeId: string) {
  return prisma.goal.findMany({
    where: { employee_id: employeeId },
    orderBy: { created_at: 'desc' }
  });
}

export async function getManagerPendingGoals(managerId: string) {
  const directReports = await prisma.user.findMany({
    where: { manager_id: managerId }
  });

  const reportIds = directReports.map((r) => r.id);

  return prisma.goal.findMany({
    where: {
      employee_id: { in: reportIds },
      status: 'pending_approval'
    },
    include: { employee: { select: { id: true, name: true, email: true } } }
  });
}
