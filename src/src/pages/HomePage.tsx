import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingState from '../components/LoadingState';
import LeaderboardCard from '../components/LeaderboardCard';
import { fetchLeaderboards } from '../services/leaderboardService';
import { Leaderboard } from '../types/leaderboard';

const HomePage = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useSWR<Leaderboard[]>('leaderboards', fetchLeaderboards, { suspense: false });

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-white shadow-lg">
        <p className="text-sm text-emerald-200">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold">{user?.name}</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Manage your leaderboards, invite contributors, and monitor your community from a single dashboard.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link className="rounded-full bg-emerald-400 px-5 py-2 font-semibold text-slate-950" to="/leaderboards">
            View leaderboards
          </Link>
          <Link className="rounded-full border border-white/30 px-5 py-2 font-semibold text-white" to="/join">
            Enter invite code
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Highlighted leaderboards</h3>
          <Link to="/leaderboards" className="text-sm font-medium text-emerald-300">
            See all
          </Link>
        </div>
        {isLoading && <LoadingState />}
        {error && (
          <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            Unable to load leaderboards. Try again later.
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {data?.slice(0, 2).map((leaderboard: Leaderboard, index: number) => (
            <div key={leaderboard.id}>
              <LeaderboardCard leaderboard={leaderboard} highlight={index === 0} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
