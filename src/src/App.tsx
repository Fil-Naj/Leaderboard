import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import JoinLeaderboardPage from './pages/JoinLeaderboardPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LandingPage from './pages/LandingPage';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}> 
        <Route path="/home" element={<HomePage />} />
        <Route path="/join" element={<JoinLeaderboardPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);

export default App;
