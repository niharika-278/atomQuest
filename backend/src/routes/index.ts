import express from 'express';
import authRoutes from './auth.routes';
import goalsRoutes from './goals.routes';
import achievementsRoutes from './achievements.routes';
import checkinsRoutes from './checkins.routes';
import adminRoutes from './admin.routes';
import reportsRoutes from './reports.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/goals', goalsRoutes);
router.use('/achievements', achievementsRoutes);
router.use('/checkins', checkinsRoutes);
router.use('/admin', adminRoutes);
router.use('/reports', reportsRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
