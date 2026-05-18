import express from 'express';
import * as goalsController from '../controllers/goals.controller';
import { authMiddleware, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', goalsController.createGoal);
router.get('/my-goals', goalsController.getMyGoals);
router.get('/pending-approvals', requireRole('MANAGER', 'ADMIN'), goalsController.getPendingApprovals);
router.post('/approve', requireRole('MANAGER', 'ADMIN'), goalsController.approveGoal);

export default router;
