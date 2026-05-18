import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as auditService from '../services/audit.service';
import * as cycleService from '../services/cycle.service';
import prisma from '../db/prisma';
import { CyclePhase, UserRole } from '@prisma/client';
import logger from '../utils/logger';

export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        is_active: true,
        manager_id: true,
        created_at: true
      },
      orderBy: { name: 'asc' }
    });
    res.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list users';
    res.status(500).json({ error: message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, name, password, role, manager_id } = req.body;
    if (!email || !name || !password) {
      res.status(400).json({ error: 'Email, name, and password required' });
      return;
    }
    const user = await authService.createUser(
      email,
      name,
      password,
      (role as UserRole) || 'EMPLOYEE',
      manager_id
    );
    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create user';
    res.status(400).json({ error: message });
  }
}

export async function toggleUserActive(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const updated = await prisma.user.update({
      where: { id },
      data: { is_active: !user.is_active }
    });
    res.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update user';
    res.status(500).json({ error: message });
  }
}

export async function getAuditLogs(req: Request, res: Response) {
  try {
    const { entity_type, entity_id, limit } = req.query;
    const logs = await auditService.getAuditLogs(
      entity_type as string | undefined,
      entity_id as string | undefined,
      limit ? parseInt(limit as string, 10) : 100
    );
    res.json(logs);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch audit logs';
    res.status(500).json({ error: message });
  }
}

export async function listCycles(_req: Request, res: Response) {
  try {
    const cycles = await cycleService.getAllCycles();
    res.json(cycles);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list cycles';
    res.status(500).json({ error: message });
  }
}

export async function createCycle(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const { year, phase, window_opens, window_closes } = req.body;
    const cycle = await cycleService.createCycle({
      year: Number(year),
      phase: phase as CyclePhase,
      window_opens: new Date(window_opens),
      window_closes: new Date(window_closes),
      created_by: req.user.sub
    });
    res.status(201).json(cycle);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create cycle';
    res.status(400).json({ error: message });
  }
}

export async function activateCycle(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cycle = await cycleService.activateCycle(id);
    res.json(cycle);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to activate cycle';
    logger.error(message);
    res.status(400).json({ error: message });
  }
}
