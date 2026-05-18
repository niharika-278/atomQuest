import express from 'express';
import * as checkinsController from '../controllers/checkins.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', checkinsController.getMyCheckIns);
router.post('/', checkinsController.upsertCheckIn);

export default router;
