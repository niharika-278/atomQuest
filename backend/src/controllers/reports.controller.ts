import { Request, Response } from 'express';
import prisma from '../db/prisma';
import logger from '../utils/logger';

export async function getCompletionDashboard(_req: Request, res: Response) {
  try {
    const [totalGoals, approvedGoals, pendingGoals, totalUsers] = await Promise.all([
      prisma.goal.count(),
      prisma.goal.count({ where: { status: 'approved' } }),
      prisma.goal.count({ where: { status: 'pending_approval' } }),
      prisma.user.count({ where: { is_active: true } })
    ]);

    res.json({
      total_goals: totalGoals,
      approved_goals: approvedGoals,
      pending_goals: pendingGoals,
      active_users: totalUsers,
      completion_rate: totalGoals > 0 ? Math.round((approvedGoals / totalGoals) * 100) : 0
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate report';
    logger.error(message);
    res.status(500).json({ error: message });
  }
}

export async function getAchievementReport(req: Request, res: Response) {
  try {
    const { quarter_code } = req.query;
    const where = quarter_code ? { quarter_code: quarter_code as string } : {};

    const achievements = await prisma.achievement.findMany({
      where,
      include: {
        goal: {
          select: {
            title: true,
            employee_id: true,
            thrust_area: true,
            target_value: true
          }
        },
        creator: { select: { name: true, email: true } }
      },
      orderBy: { updated_at: 'desc' },
      take: 200
    });

    res.json(achievements);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate achievement report';
    res.status(500).json({ error: message });
  }
}
