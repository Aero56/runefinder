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

const AuthRoute = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/?signin" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <>
      <Header />
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
    </>
  );
};

export default App;
