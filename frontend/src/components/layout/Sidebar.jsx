import { LayoutDashboard, PlusCircle, Users, CalendarDays } from 'lucide-react';

const Sidebar = ({ tab, setTab }) => {
  const items = [
    { key: 'stats', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'createClub', label: 'Create Club', icon: PlusCircle },
    { key: 'createEvent', label: 'Create Event', icon: CalendarDays },
    { key: 'students', label: 'View Students', icon: Users },
    { key: 'registrations', label: 'Registrations', icon: Users }
  ];

  return (
    <aside className="glass-card h-fit w-full p-4 lg:w-64">
      <h2 className="mb-4 text-xl font-bold">Admin Panel</h2>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 transition ${tab === item.key ? 'bg-indigo-500/50' : 'hover:bg-white/10'}`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
