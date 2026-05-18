import prisma from '../db/prisma';
import { calculateProgressScore } from '../utils/calculations';
import { AchievementStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import logger from '../utils/logger';
import * as auditService from './audit.service';

export interface CreateAchievementInput {
  goal_id: string;
  quarter_code: string;
  actual_value: number;
  status: AchievementStatus;
}

export async function logAchievement(input: CreateAchievementInput, createdBy: string) {
  const goal = await prisma.goal.findUnique({ where: { id: input.goal_id } });

  if (!goal) {
    throw new Error('Goal not found');
  }

  if (!goal.is_locked) {
    throw new Error('Goal must be approved before logging achievements');
  }

  const progress_score = calculateProgressScore(
    input.actual_value,
    Number(goal.target_value),
    goal.uom_type
  );

  const achievement = await prisma.achievement.upsert({
    where: {
      goal_id_quarter_code: {
        goal_id: input.goal_id,
        quarter_code: input.quarter_code
      }
    },
    create: {
      goal_id: input.goal_id,
      quarter_code: input.quarter_code,
      actual_value: new Decimal(input.actual_value),
      status: input.status,
      progress_score: new Decimal(progress_score),
      created_by: createdBy
    },
    update: {
      actual_value: new Decimal(input.actual_value),
      status: input.status,
      progress_score: new Decimal(progress_score)
    }
  });

  await auditService.logAuditEvent({
    entity_type: 'achievements',
    entity_id: achievement.id,
    action: 'create',
    changed_by: createdBy,
    new_value: achievement
  });

  logger.info(`Achievement logged: ${achievement.id}, Progress: ${progress_score}%`);
  return achievement;
}

export async function getQuarterlyAchievements(employeeId: string, quarterCode: string) {
  return prisma.goal.findMany({
    where: { employee_id: employeeId, status: 'approved' },
    include: {
      achievements: { where: { quarter_code: quarterCode } }
    }
  });
}
