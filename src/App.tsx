import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Auth from 'components/Auth';
import BottomNavigation from 'components/BottomNavigation';
import SetUsername from 'components/Dialogs/SetUsername';
import Header from 'components/Header';
import Notifications from 'components/Notifications';
import { useAuth } from 'contexts/AuthContext';
import { useScrollToTop } from 'hooks/useScrollToTop';
import Group from 'pages/Group';
import Groups from 'pages/Groups';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Player from 'pages/Player';
import ChangePassword from 'pages/auth/ChangePassword';
import Settings from 'pages/auth/Settings';
import Info from 'pages/info/Info';
import Privacy from 'pages/info/Privacy';

import 'react-toastify/dist/ReactToastify.min.css';

const AuthRoute = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/?signin" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { session } = useAuth();

  useScrollToTop();

  return (
    <div className={session ? 'pb-16 sm:pb-0' : ''}>
      <Header />
      <BottomNavigation />
      <Notifications />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<Group />} />

        <Route path="/player/:id" element={<Player />} />

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
      <SetUsername />
    </div>
  );
};

export default App;
