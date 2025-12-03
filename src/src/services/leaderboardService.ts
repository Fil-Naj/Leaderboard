import { Leaderboard, LeaderboardJoinRequest } from '../types/leaderboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const mockLeaderboards: Leaderboard[] = [
  {
    id: 'oss-stars',
    name: 'Open Source All-Stars',
    description: 'Tracks community contributions across starred repos.',
    category: 'OSS',
    memberCount: 87,
    topPlayers: [
      { userId: '1', displayName: 'Aria', score: 12890 },
      { userId: '2', displayName: 'Noah', score: 10340 },
      { userId: '3', displayName: 'Kai', score: 9840 }
    ]
  },
  {
    id: 'weekly-velocity',
    name: 'Weekly Delivery Velocity',
    description: 'How fast teams ship cards, PRs, and incidents.',
    category: 'Velocity',
    memberCount: 34,
    topPlayers: [
      { userId: '8', displayName: 'Delaney', score: 430 },
      { userId: '9', displayName: 'Max', score: 417 },
      { userId: '10', displayName: 'Zara', score: 398 }
    ]
  }
];

const resolveApi = (path: string) => {
  if (!API_BASE_URL) {
    return undefined;
  }

  return `${API_BASE_URL.replace(/\/$/, '')}${path}`;
};

export const fetchLeaderboards = async (): Promise<Leaderboard[]> => {
  const url = resolveApi('/leaderboards');

  if (!url) {
    return mockLeaderboards;
  }

  const response = await fetch(url, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Unable to load leaderboards');
  }

  const payload = (await response.json()) as Leaderboard[];
  return payload;
};

export const joinLeaderboard = async (request: LeaderboardJoinRequest) => {
  const url = resolveApi('/leaderboards/join');
  if (!url) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: 'Preview: you have been added to the leaderboard.' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || 'Unable to join leaderboard');
  }

  return response.json();
};
