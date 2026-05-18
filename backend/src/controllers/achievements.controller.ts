import { Request, Response } from 'express';
import * as achievementsService from '../services/achievements.service';
import { AchievementStatus } from '@prisma/client';
import logger from '../utils/logger';

export async function logAchievement(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { goal_id, quarter_code, actual_value, status } = req.body;

    if (!goal_id || !quarter_code || actual_value === undefined || !status) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const achievement = await achievementsService.logAchievement(
      {
        goal_id,
        quarter_code,
        actual_value: Number(actual_value),
        status: status as AchievementStatus
      },
      req.user.sub
    );

    res.status(201).json(achievement);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to log achievement';
    logger.error(`Achievement logging error: ${message}`);
    res.status(400).json({ error: message });
  }
}

export async function getQuarterlyAchievements(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { quarter_code } = req.query;
    if (!quarter_code || typeof quarter_code !== 'string') {
      res.status(400).json({ error: 'Quarter code required' });
      return;
    }

    const achievements = await achievementsService.getQuarterlyAchievements(
      req.user.sub,
      quarter_code
    );

    res.json(achievements);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch achievements';
    logger.error(`Get achievements error: ${message}`);
    res.status(500).json({ error: message });
  }
}
