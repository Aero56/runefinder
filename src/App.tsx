import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Notifications from '@components/Notifications';
import Account from '@pages/auth/Account';
import Player from '@pages/Player';
import Group from '@pages/Group';
import { useAuth } from '@contexts/AuthContext';
import Header from '@components/Header';
import Login from '@components/Login';
import Signup from '@components/Signup';

const AuthRoute = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <>
      <Header />
      <Login />
      <Signup />
      <Notifications />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:username" element={<Player />} />
        <Route path="/group/:id" element={<Group />} />

        <Route element={<AuthRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
