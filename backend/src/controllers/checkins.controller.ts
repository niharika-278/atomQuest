import { Request, Response } from 'express';
import prisma from '../db/prisma';
import logger from '../utils/logger';

export async function getMyCheckIns(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const checkins = await prisma.checkIn.findMany({
      where: { employee_id: req.user.sub },
      include: { manager: { select: { id: true, name: true, email: true } } },
      orderBy: { created_at: 'desc' }
    });

    res.json(checkins);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch check-ins';
    res.status(500).json({ error: message });
  }
}

export async function upsertCheckIn(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { manager_id, quarter_code, comment, is_completed } = req.body;
    if (!manager_id || !quarter_code) {
      res.status(400).json({ error: 'manager_id and quarter_code required' });
      return;
    }

    const checkin = await prisma.checkIn.upsert({
      where: {
        employee_id_manager_id_quarter_code: {
          employee_id: req.user.sub,
          manager_id,
          quarter_code
        }
      },
      create: {
        employee_id: req.user.sub,
        manager_id,
        quarter_code,
        comment,
        is_completed: is_completed ?? false,
        completed_at: is_completed ? new Date() : null
      },
      update: {
        comment,
        is_completed: is_completed ?? false,
        completed_at: is_completed ? new Date() : null
      }
    });

    res.json(checkin);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save check-in';
    logger.error(message);
    res.status(400).json({ error: message });
  }
}
