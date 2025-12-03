import { ChangeEvent, FormEvent, useState } from 'react';
import { joinLeaderboard } from '../services/leaderboardService';

const JoinLeaderboardPage = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!inviteCode.trim()) {
      setStatus('error');
      setMessage('Invite code is required.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');
      const response = await joinLeaderboard({ inviteCode: inviteCode.trim(), githubUsername: githubUsername || undefined });
      setStatus('success');
      setMessage(response.message || 'Request submitted. You will receive an email shortly.');
      setInviteCode('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to join leaderboard right now.');
    }
  };

  return (
    <section className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Join a leaderboard</h1>
        <p className="text-sm text-slate-300">Enter the invite code shared by an owner to request access.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-8 text-white shadow">
        <label className="block text-sm font-medium text-slate-200">
          Invite code
          <input
            value={inviteCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInviteCode(event.target.value)}
            placeholder="e.g. OSS-PR-ALPHA"
            className="mt-2 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-300"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          GitHub username (optional)
          <input
            value={githubUsername}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setGithubUsername(event.target.value)}
            placeholder="octocat"
            className="mt-2 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-300"
          />
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 disabled:opacity-70"
        >
          {status === 'loading' ? 'Submitting…' : 'Request access'}
        </button>

        {message && (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              status === 'success'
                ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
                : 'border border-rose-400/40 bg-rose-400/10 text-rose-100'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
};

export default JoinLeaderboardPage;
