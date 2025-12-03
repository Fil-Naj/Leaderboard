import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { path: '/home', label: 'Home' },
  { path: '/leaderboards', label: 'Leaderboards' },
  { path: '/join', label: 'Join' }
];

const Layout = ({ children }: LayoutProps) => {
  const { user, login, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      <header className="backdrop-blur bg-slate-950/60 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <FontAwesomeIcon icon={faRankingStar} className="text-amber-400" />
            Leaderboard Portal
          </Link>
          {user && (
            <nav className="hidden gap-6 text-sm font-medium sm:flex">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={location.pathname === path ? 'text-white' : 'text-slate-300 hover:text-white'}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-9 w-9 rounded-full border border-white/10"
                />
                <div className="text-sm">
                  <p className="font-semibold leading-none">{user.name}</p>
                  <button
                    onClick={logout}
                    className="text-xs text-emerald-300 hover:text-emerald-200"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={login}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
      </main>
      <footer className="border-t border-white/5 bg-slate-950/60 py-6 text-center text-xs text-slate-400">
        Built for Azure App Service · GitHub auth ready
      </footer>
    </div>
  );
};

export default Layout;
