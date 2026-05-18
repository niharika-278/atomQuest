import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { generateAccessToken } from '../utils/jwt';
import { config } from '../config/env';
import logger from '../utils/logger';

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    logger.error(`Login error: ${message}`);
    res.status(401).json({ error: message });
  }
}

export async function handleRefresh(req: Request, res: Response) {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const access_token = await authService.refreshAccessToken(req.user.sub);
    res.json({ access_token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token refresh failed';
    logger.error(`Token refresh error: ${message}`);
    res.status(401).json({ error: message });
  }
}

export async function handleDemoRoleSwitch(req: Request, res: Response) {
  try {
    if (!config.demo_mode) {
      res.status(403).json({ error: 'Demo mode not enabled' });
      return;
    }

    const { role } = req.body;
    if (!['EMPLOYEE', 'MANAGER', 'ADMIN'].includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const newPayload = { ...req.user, role: role as 'EMPLOYEE' | 'MANAGER' | 'ADMIN' };
    const access_token = generateAccessToken(newPayload);
    res.json({ access_token, role });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Role switch failed';
    logger.error(`Demo role switch error: ${message}`);
    res.status(500).json({ error: message });
  }
}
