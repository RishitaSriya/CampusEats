import { CalendarDays, MapPin, Users } from 'lucide-react';

const EventCard = ({ event, onRegister, disabled, isRegistered }) => {
  const formattedDate = new Date(event.date).toLocaleString();

  return (
    <div className="glass-card p-5 transition duration-300 ease-in-out hover:scale-[1.02]">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="mt-2 text-sm text-slate-200">{event.description}</p>
      <p className="mt-2 text-indigo-200">Club: {event.club?.name}</p>
      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2"><CalendarDays size={16} /> {formattedDate}</p>
        <p className="flex items-center gap-2"><MapPin size={16} /> {event.venue}</p>
        <p className="flex items-center gap-2"><Users size={16} /> Available Seats: {event.availableSeats}</p>
      </div>
      <button
        disabled={disabled || isRegistered || event.availableSeats <= 0}
        onClick={onRegister}
        className="btn-primary mt-4 w-full"
      >
        {isRegistered ? 'Already Registered' : event.availableSeats <= 0 ? 'Full' : 'Register'}
      </button>
    </div>
  );
};

export default EventCard;
