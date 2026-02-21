import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import EventCard from '../components/ui/EventCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const [clubsRes, eventsRes, meRes] = await Promise.all([api.get('/clubs'), api.get('/events'), api.get('/users/me')]);
      setClubs(clubsRes.data);
      setEvents(eventsRes.data);
      setMe(meRes.data);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const register = async (eventId) => {
    if (!window.confirm('Confirm event registration?')) return;
    try {
      await api.post(`/events/register/${eventId}`);
      toast.success('Registered successfully');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  const registeredIds = new Set(me?.registeredEvents?.map((e) => e._id));

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="glass-card p-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-slate-200">Track clubs, discover events, and manage your registrations.</p>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Clubs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div key={club._id} className="glass-card p-4">
              <h3 className="text-lg font-bold">{club.name}</h3>
              <p className="mt-2 text-sm text-slate-200">{club.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Upcoming Events</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isRegistered={registeredIds.has(event._id)}
              onRegister={() => register(event._id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">My Registered Events</h2>
        {me?.registeredEvents?.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {me.registeredEvents.map((event) => (
              <div key={event._id} className="glass-card p-4">
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-slate-200">{event.club?.name} • {new Date(event.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center text-slate-200">No registrations yet.</div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
