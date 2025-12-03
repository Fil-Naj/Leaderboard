# Leaderboard Front End

React + Vite single-page app that handles GitHub authentication through Azure App Service and surfaces curated screens for joining and browsing leaderboards.

## Getting started

```bash
cd src
npm install
npm run dev
```

Copy `.env.sample` to `.env` if you want to target an API locally:

```
VITE_API_BASE_URL=https://localhost:7071/api
```

## Azure App Service authentication

This UI assumes the site is hosted on Azure App Service with App Service Authentication turned on and GitHub configured as the provider. Relevant endpoints:

- `/.auth/login/github?post_login_redirect_uri={url}`
- `/.auth/logout?post_logout_redirect_uri={url}`
- `/.auth/me` to read the authenticated principal

The `AuthContext` in `src/context/AuthContext.tsx` calls those endpoints and exposes `login`, `logout`, and `user` state to the rest of the app.

## App structure

- `src/pages/LandingPage.tsx` – marketing-style landing that prompts GitHub sign-in
- `src/pages/HomePage.tsx` – authenticated home surface with highlights
- `src/pages/LeaderboardsPage.tsx` – searchable grid of leaderboards
- `src/pages/JoinLeaderboardPage.tsx` – invite-code workflow
- `src/services/leaderboardService.ts` – placeholder fetch helpers; points to `VITE_API_BASE_URL` when provided

## Deployment notes

1. Build the app with `npm run build` (outputs to `src/dist`).
2. Deploy the `dist` folder to your Azure App Service (Linux container or Windows). Any static hosting approach works.
3. In the Azure portal, enable App Service Authentication, require authentication, and add GitHub as the identity provider. Set the callback URL to `https://<your-app-name>.azurewebsites.net/.auth/login/github/callback`.
4. Optionally expose your API through the same hostname (reverse proxy) so `VITE_API_BASE_URL` can be `/api` and cookies are shared.
