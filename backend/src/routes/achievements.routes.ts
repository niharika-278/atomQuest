import express from 'express';
import * as achievementsController from '../controllers/achievements.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', achievementsController.logAchievement);
router.get('/quarterly', achievementsController.getQuarterlyAchievements);

export default router;
