export interface AuthUser {
  userId: string;
  name: string;
  avatarUrl: string;
  email?: string;
  provider: 'github' | 'unknown';
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error?: string;
  login: () => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

export interface EasyAuthResponse {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: {typ: string; val: string}[];
  accessToken?: {token: string; expires_on: string};
}
