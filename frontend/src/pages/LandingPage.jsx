import { Link } from 'react-router-dom';

const LandingPage = () => (
  <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
    <div className="glass-card p-10 text-center">
      <h1 className="text-4xl font-extrabold md:text-6xl">College Club Event Management</h1>
      <p className="mx-auto mt-4 max-w-2xl text-slate-200">
        Discover clubs, register for exciting events, and manage campus engagement with a premium dashboard experience.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/login" className="btn-primary">Login</Link>
        <Link to="/register" className="rounded-xl border border-white/20 px-4 py-2 transition hover:bg-white/10">Register as Student</Link>
      </div>
    </div>
  </main>
);

export default LandingPage;
