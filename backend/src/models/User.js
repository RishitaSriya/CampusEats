import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
