import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (_req, res) => {
  const events = await Event.find()
    .populate('club', 'name')
    .populate('registeredStudents', 'name rollNo email')
    .sort({ date: 1 });

  const enriched = events.map((event) => ({
    ...event.toObject(),
    availableSeats: event.maxParticipants - event.registeredStudents.length
  }));

  return res.json(enriched);
};

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const alreadyRegistered = event.registeredStudents.some((id) => id.toString() === userId.toString());
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    if (event.registeredStudents.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.registeredStudents.push(userId);
    await event.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { registeredEvents: eventId } });

    return res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await User.updateMany({ registeredEvents: event._id }, { $pull: { registeredEvents: event._id } });
    return res.json({ message: 'Event deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
