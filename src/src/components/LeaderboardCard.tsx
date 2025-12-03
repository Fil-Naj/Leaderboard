import { Leaderboard } from '../types/leaderboard';
import { clsx } from 'clsx';

interface LeaderboardCardProps {
  leaderboard: Leaderboard;
  highlight?: boolean;
}

const LeaderboardCard = ({ leaderboard, highlight }: LeaderboardCardProps) => (
  <article
    className={clsx(
      'rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition',
      highlight && 'border-emerald-300/60 bg-emerald-300/5'
    )}
  >
    <header className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-emerald-200">{leaderboard.category}</p>
        <h3 className="mt-1 text-xl font-semibold text-white">{leaderboard.name}</h3>
      </div>
      <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-200">
        {leaderboard.memberCount} members
      </span>
    </header>
    <p className="text-sm text-slate-300">{leaderboard.description}</p>
    <ul className="mt-4 space-y-2 text-sm text-slate-200">
      {leaderboard.topPlayers.map((player, index) => (
        <li key={player.userId} className="flex items-center justify-between">
          <span>
            #{index + 1} {player.displayName}
          </span>
          <span className="font-semibold text-emerald-200">{player.score.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  </article>
);

export default LeaderboardCard;
