import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Notifications from '@components/Notifications';
import Account from './pages/auth/Account';
import Player from './pages/Player';
import { useAuth } from '@contexts/AuthContext';

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
      <Notifications />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:username" element={<Player />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<AuthRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
