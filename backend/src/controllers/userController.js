import User from '../models/User.js';
import Event from '../models/Event.js';
import Club from '../models/Club.js';

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-password').populate('registeredEvents', 'title date venue');
  return res.json(users);
};

export const getMe = async (req, res) => {
  const me = await User.findById(req.user._id)
    .select('-password')
    .populate({ path: 'registeredEvents', populate: { path: 'club', select: 'name' } });
  return res.json(me);
};

export const getStats = async (_req, res) => {
  const [totalStudents, totalClubs, totalEvents, events] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    Club.countDocuments(),
    Event.countDocuments(),
    Event.find().select('registeredStudents')
  ]);

  const totalRegistrations = events.reduce((sum, e) => sum + e.registeredStudents.length, 0);

  return res.json({ totalStudents, totalClubs, totalEvents, totalRegistrations });
};
