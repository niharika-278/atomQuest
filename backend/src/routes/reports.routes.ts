import express from 'express';
import * as reportsController from '../controllers/reports.controller';
import { authMiddleware, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole('MANAGER', 'ADMIN'));

router.get('/completion', reportsController.getCompletionDashboard);
router.get('/achievements', reportsController.getAchievementReport);

export default router;
