import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { authMiddleware, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole('ADMIN'));

router.get('/users', adminController.listUsers);
router.post('/users', adminController.createUser);
router.patch('/users/:id/toggle', adminController.toggleUserActive);
router.get('/audit-logs', adminController.getAuditLogs);
router.get('/cycles', adminController.listCycles);
router.post('/cycles', adminController.createCycle);
router.patch('/cycles/:id/activate', adminController.activateCycle);

export default router;
