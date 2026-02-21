import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import Sidebar from '../components/layout/Sidebar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clubForm, setClubForm] = useState({ name: 'Technical', description: '' });
  const [eventForm, setEventForm] = useState({ title: 'Code Marathon', description: '', club: '', date: '', venue: '', maxParticipants: 50 });

  const load = async () => {
    setLoading(true);
    try {
      const [statsRes, clubsRes, eventsRes, studentsRes] = await Promise.all([
        api.get('/users/stats'),
        api.get('/clubs'),
        api.get('/events'),
        api.get('/users')
      ]);
      setStats(statsRes.data);
      setClubs(clubsRes.data);
      setEvents(eventsRes.data);
      setStudents(studentsRes.data.filter((u) => u.role === 'student'));
      if (!eventForm.club && clubsRes.data.length) {
        setEventForm((prev) => ({ ...prev, club: clubsRes.data[0]._id }));
      }
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createClub = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clubs/create', clubForm);
      toast.success('Club created');
      setClubForm({ name: 'Technical', description: '' });
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create club');
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events/create', eventForm);
      toast.success('Event created');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await api.delete(`/events/${id}`);
    toast.success('Event deleted');
    load();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px,1fr]">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="space-y-4">
        {tab === 'stats' && stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="glass-card p-5">
                <p className="text-sm uppercase text-slate-300">{key}</p>
                <p className="text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'createClub' && (
          <form onSubmit={createClub} className="glass-card space-y-3 p-6">
            <h3 className="text-xl font-bold">Create Club</h3>
            <select className="input" value={clubForm.name} onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}>
              {['Technical', 'Innovation', 'Dance', 'Singing', 'Photography', 'Drama', 'Gaming'].map((name) => <option key={name}>{name}</option>)}
            </select>
            <textarea className="input" placeholder="Description" value={clubForm.description} onChange={(e) => setClubForm({ ...clubForm, description: e.target.value })} required />
            <button className="btn-primary">Create Club</button>
          </form>
        )}

        {tab === 'createEvent' && (
          <form onSubmit={createEvent} className="glass-card grid gap-3 p-6 md:grid-cols-2">
            <h3 className="col-span-full text-xl font-bold">Create Event</h3>
            <select className="input" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}>
              {['Code Marathon', 'Hackathon', 'Flashmob', 'Singing Competition', 'Startup Pitch', 'Gaming Tournament', 'BGMI Tournament'].map((title) => <option key={title}>{title}</option>)}
            </select>
            <select className="input" value={eventForm.club} onChange={(e) => setEventForm({ ...eventForm, club: e.target.value })}>
              {clubs.map((club) => <option value={club._id} key={club._id}>{club.name}</option>)}
            </select>
            <input className="input" type="datetime-local" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
            <input className="input" placeholder="Venue" value={eventForm.venue} onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })} required />
            <input className="input" type="number" placeholder="Max participants" value={eventForm.maxParticipants} onChange={(e) => setEventForm({ ...eventForm, maxParticipants: Number(e.target.value) })} required />
            <textarea className="input md:col-span-2" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required />
            <button className="btn-primary md:col-span-2">Create Event</button>
          </form>
        )}

        {tab === 'students' && (
          <div className="glass-card overflow-auto p-6">
            <h3 className="mb-3 text-xl font-bold">Students</h3>
            <table className="w-full text-left">
              <thead><tr><th>Name</th><th>Roll No</th><th>Email</th></tr></thead>
              <tbody>{students.map((s) => <tr key={s._id}><td>{s.name}</td><td>{s.rollNo}</td><td>{s.email}</td></tr>)}</tbody>
            </table>
          </div>
        )}

        {tab === 'registrations' && (
          <div className="space-y-3">
            {events.map((event) => (
              <div className="glass-card p-5" key={event._id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold">{event.title} ({event.club?.name})</h4>
                  <button onClick={() => deleteEvent(event._id)} className="rounded-xl border border-rose-300/30 px-3 py-1 text-rose-300 transition hover:bg-rose-500/20">Delete</button>
                </div>
                <p className="text-slate-300">Registered: {event.registeredStudents.length}</p>
                <ul className="mt-2 list-inside list-disc text-sm text-slate-200">
                  {event.registeredStudents.length ? event.registeredStudents.map((st) => (
                    <li key={st._id}>{st.name} ({st.rollNo})</li>
                  )) : <li>No students yet</li>}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
