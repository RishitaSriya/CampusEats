import express from 'express';
import { createEvent, deleteEvent, getEvents, registerForEvent } from '../controllers/eventController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorize('admin'), createEvent);
router.get('/', getEvents);
router.post('/register/:eventId', protect, authorize('student'), registerForEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

export default router;
