import { Request, Response } from 'express';
import * as goalsService from '../services/goals.service';
import logger from '../utils/logger';

export async function createGoal(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { thrust_area, title, description, uom_type, target_value, weightage } = req.body;

    if (!thrust_area || !title || !uom_type || target_value === undefined || weightage === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const goal = await goalsService.createGoal(
      {
        employee_id: req.user.sub,
        thrust_area,
        title,
        description,
        uom_type,
        target_value: Number(target_value),
        weightage: Number(weightage)
      },
      req.user.sub
    );

    res.status(201).json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create goal';
    logger.error(`Goal creation error: ${message}`);
    res.status(400).json({ error: message });
  }
}

export async function approveGoal(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { goalId, action } = req.body;
    if (!goalId || !['approve', 'reject'].includes(action)) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    const goal = await goalsService.approveGoal(goalId, req.user.sub, action);
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Approval failed';
    logger.error(`Goal approval error: ${message}`);
    res.status(400).json({ error: message });
  }
}

export async function getMyGoals(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const goals = await goalsService.getEmployeeGoals(req.user.sub);
    res.json(goals);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch goals';
    logger.error(`Get goals error: ${message}`);
    res.status(500).json({ error: message });
  }
}

export async function getPendingApprovals(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const goals = await goalsService.getManagerPendingGoals(req.user.sub);
    res.json(goals);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch pending goals';
    logger.error(`Get pending goals error: ${message}`);
    res.status(500).json({ error: message });
  }
}
