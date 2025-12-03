import { ChangeEvent, useMemo, useState } from 'react';
import useSWR from 'swr';
import { fetchLeaderboards } from '../services/leaderboardService';
import LoadingState from '../components/LoadingState';
import LeaderboardCard from '../components/LeaderboardCard';
import { Leaderboard } from '../types/leaderboard';

const LeaderboardsPage = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useSWR('leaderboards', fetchLeaderboards);

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((item: Leaderboard) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
          <p className="text-sm text-slate-300">Browse all available leaderboards across your organization.</p>
        </div>
        <input
          aria-label="Search leaderboards"
          placeholder="Search by name"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-white placeholder:text-slate-400 focus:border-emerald-300"
        />
      </header>

      {isLoading && <LoadingState />}
      {error && (
        <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          Unable to load leaderboards. Try again shortly.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((leaderboard: Leaderboard) => (
          <div key={leaderboard.id}>
            <LeaderboardCard leaderboard={leaderboard} />
          </div>
        ))}
      </div>

      {!isLoading && !filtered.length && (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-slate-200">
          No leaderboards match your search yet.
        </p>
      )}
    </section>
  );
};

export default LeaderboardsPage;
