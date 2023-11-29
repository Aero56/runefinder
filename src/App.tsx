import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Notifications from '@components/Notifications';
import Player from '@pages/Player';
import Group from '@pages/Group';
import { useAuth } from '@contexts/AuthContext';
import Header from '@components/Header';
import ChangePassword from '@pages/auth/ChangePassword';
import Auth from '@components/Auth';
import Settings from '@pages/auth/Settings';
import BottomNavigation from '@components/BottomNavigation';

const AuthRoute = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/?signin" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { session } = useAuth();

  return (
    <div className={session ? 'pb-8 sm:pb-0' : ''}>
      <Header />
      <BottomNavigation />
      <Notifications />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/group/:id" element={<Group />} />

        <Route element={<AuthRoute />}>
          <Route
            path="/settings/change-password"
            element={<ChangePassword />}
          />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Auth />
    </div>
  );
};

export default App;
