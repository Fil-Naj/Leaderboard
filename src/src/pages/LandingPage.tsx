import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';

const LandingPage = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-10 shadow-2xl">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Powered by Azure App Service</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
        Ship a leaderboard in hours, not weeks.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-300">
        Connect with GitHub, invite your community, and watch the rankings update in real-time. This front end is
        pre-wired for Azure App Service auth and ready to plug into your API.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={login}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:translate-y-0.5"
        >
          {loading ? 'Checking session…' : 'Continue with GitHub'}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-slate-100">
          <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-300" />
          Azure-managed authentication
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
