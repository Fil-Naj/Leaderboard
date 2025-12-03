import { AuthUser, EasyAuthResponse } from '../types/auth';

const AUTH_ME_ENDPOINT = '/.auth/me';
const LOGIN_ENDPOINT = '/.auth/login/github';
const LOGOUT_ENDPOINT = '/.auth/logout';

const getClaim = (claims: EasyAuthResponse['claims'], type: string) =>
  claims.find((claim) => claim.typ === type)?.val;

const resolveAvatar = (claims: EasyAuthResponse['claims'], fallbackId: string) =>
  getClaim(claims, 'avatar_url') || `https://avatars.githubusercontent.com/u/${fallbackId}?v=4`;

export const fetchCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const response = await fetch(AUTH_ME_ENDPOINT, { credentials: 'include' });
    if (!response.ok) {
      return null;
    }

    const payload: EasyAuthResponse[] = await response.json();
    const identity = payload[0];

    if (!identity) {
      return null;
    }

    const displayName =
      getClaim(identity.claims, 'name') || identity.userDetails || 'GitHub user';
    const email =
      getClaim(
        identity.claims,
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ) || undefined;

    const avatarUrl = resolveAvatar(identity.claims, identity.userId);

    const user: AuthUser = {
      userId: identity.userId,
      name: displayName,
      email,
      avatarUrl,
      provider: identity.identityProvider === 'github' ? 'github' : 'unknown'
    };

    return user;
  } catch (error) {
    console.error('Failed to fetch current user', error);
    return null;
  }
};

const redirectWith = (base: string, path: string) =>
  `${base}?${new URLSearchParams({ post_login_redirect_uri: path }).toString()}`;

export const loginWithGitHub = () => {
  const redirect = `${window.location.origin}/home`;
  window.location.href = redirectWith(LOGIN_ENDPOINT, redirect);
};

export const logoutFromAppService = () => {
  const redirect = `${window.location.origin}/`;
  const url = `${LOGOUT_ENDPOINT}?${new URLSearchParams({ post_logout_redirect_uri: redirect }).toString()}`;
  window.location.href = url;
};
