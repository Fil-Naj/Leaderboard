export interface LeaderboardPlayer {
  userId: string;
  displayName: string;
  score: number;
}

export interface Leaderboard {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  topPlayers: LeaderboardPlayer[];
}

export interface LeaderboardJoinRequest {
  inviteCode: string;
  githubUsername?: string;
}
