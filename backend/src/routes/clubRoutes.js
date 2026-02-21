import express from 'express';
import { createClub, getClubById, getClubs, manageClubMembers } from '../controllers/clubController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorize('admin'), createClub);
router.get('/', getClubs);
router.get('/:id', getClubById);
router.patch('/:id/members', protect, authorize('admin'), manageClubMembers);

export default router;
