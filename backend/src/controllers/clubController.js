import Club from '../models/Club.js';

export const createClub = async (req, res) => {
  try {
    const { name, description } = req.body;
    const club = await Club.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id]
    });
    return res.status(201).json(club);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClubs = async (_req, res) => {
  const clubs = await Club.find().populate('createdBy', 'name email').populate('members', 'name rollNo role');
  return res.json(clubs);
};

export const getClubById = async (req, res) => {
  const club = await Club.findById(req.params.id).populate('members', 'name rollNo email role');
  if (!club) return res.status(404).json({ message: 'Club not found' });
  return res.json(club);
};

export const manageClubMembers = async (req, res) => {
  try {
    const { memberId } = req.body;
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    const exists = club.members.some((id) => id.toString() === memberId);
    club.members = exists
      ? club.members.filter((id) => id.toString() !== memberId)
      : [...club.members, memberId];

    await club.save();
    return res.json({ message: exists ? 'Member removed' : 'Member added', club });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
