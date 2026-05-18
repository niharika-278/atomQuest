import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', authController.handleLogin);
router.post('/refresh', authMiddleware, authController.handleRefresh);
router.post('/demo/switch-role', authMiddleware, authController.handleDemoRoleSwitch);

export default router;
