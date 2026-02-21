import express from 'express';
import { getMe, getStats, getUsers } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.get('/me', protect, getMe);
router.get('/stats', protect, authorize('admin'), getStats);

export default router;
