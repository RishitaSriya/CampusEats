import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Club from '../models/Club.js';
import Event from '../models/Event.js';

dotenv.config();

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Club.deleteMany({}), Event.deleteMany({})]);

  const password = await bcrypt.hash('Password@123', 10);

  const users = await User.insertMany([
    { name: 'Rishita', rollNo: '25MVCSDR0447', email: 'rishita@college.edu', password, role: 'student' },
    { name: 'Arjun', rollNo: '25MVCSDR0448', email: 'arjun@college.edu', password, role: 'student' },
    { name: 'Meera', rollNo: '25MVCSDR0449', email: 'meera@college.edu', password, role: 'student' },
    { name: 'Karan', rollNo: '25MVCSDR0450', email: 'karan@college.edu', password, role: 'student' },
    { name: 'Priya', rollNo: '25MVCSDR0451', email: 'priya@college.edu', password, role: 'student' },
    { name: 'Sriya', rollNo: 'ADMIN001', email: 'sriya@college.edu', password, role: 'admin' },
    { name: 'Rahul', rollNo: 'ADMIN002', email: 'rahul@college.edu', password, role: 'admin' }
  ]);

  const sriya = users.find((u) => u.name === 'Sriya');
  const rahul = users.find((u) => u.name === 'Rahul');

  const clubs = await Club.insertMany([
    { name: 'Technical', description: 'Coding, AI, and software sessions.', createdBy: sriya._id, members: [sriya._id] },
    { name: 'Innovation', description: 'Idea labs and startup culture.', createdBy: rahul._id, members: [rahul._id] },
    { name: 'Dance', description: 'Flashmobs and choreography.', createdBy: sriya._id, members: [sriya._id] },
    { name: 'Singing', description: 'Acoustic and choir events.', createdBy: rahul._id, members: [rahul._id] },
    { name: 'Photography', description: 'Campus photo walks and edits.', createdBy: sriya._id, members: [sriya._id] },
    { name: 'Gaming', description: 'Esports competitions and LAN events.', createdBy: rahul._id, members: [rahul._id] }
  ]);

  const mapClub = Object.fromEntries(clubs.map((club) => [club.name, club._id]));

  await Event.insertMany([
    {
      title: 'Code Marathon',
      description: 'Solve DSA and web challenges in teams.',
      club: mapClub.Technical,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      venue: 'Lab 2',
      maxParticipants: 60
    },
    {
      title: 'Hackathon',
      description: '24-hour innovation sprint.',
      club: mapClub.Innovation,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      venue: 'Innovation Hub',
      maxParticipants: 120
    },
    {
      title: 'Flashmob',
      description: 'Open stage flashmob showdown.',
      club: mapClub.Dance,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      venue: 'Main Quadrangle',
      maxParticipants: 80
    },
    {
      title: 'Singing Competition',
      description: 'Solo and duet music contest.',
      club: mapClub.Singing,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
      venue: 'Auditorium',
      maxParticipants: 40
    },
    {
      title: 'Startup Pitch',
      description: 'Pitch ideas to alumni founders.',
      club: mapClub.Innovation,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      venue: 'Seminar Hall',
      maxParticipants: 50
    },
    {
      title: 'BGMI Tournament',
      description: 'Campus battle royale finals.',
      club: mapClub.Gaming,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      venue: 'Esports Arena',
      maxParticipants: 100
    }
  ]);

  console.log('🌱 Seed data inserted. Default password: Password@123');
  process.exit(0);
};

run();
