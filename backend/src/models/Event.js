import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: [
        'Code Marathon',
        'Hackathon',
        'Flashmob',
        'Singing Competition',
        'Startup Pitch',
        'Gaming Tournament',
        'BGMI Tournament'
      ]
    },
    description: { type: String, required: true },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    maxParticipants: { type: Number, required: true, min: 1 },
    registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
