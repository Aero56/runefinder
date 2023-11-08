import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Notifications from '@components/Notifications';
import Account from '@pages/auth/Account';
import Player from '@pages/Player';
import Group from '@pages/Group';
import { useAuth } from '@contexts/AuthContext';
import Header from '@components/Header';
import ChangePassword from '@pages/auth/ChangePassword';
import Auth from '@components/Auth';

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
          <Route path="/account" element={<Account />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Auth />
    </>
  );
};

export default App;
