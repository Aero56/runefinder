import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import ResetPassword from './Dialogs/ResetPassword';
import Login from './Dialogs/Login';
import Signup from './Dialogs/Signup';

const Auth = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const shouldShowSignin = !user && searchParams.has('signin');
  const shouldShowSignup = !user && searchParams.has('signup');
  const shouldShowPasswordReset = searchParams.has('reset-password');

  const handleClose = useCallback(() => {
    searchParams.delete('signin');
    searchParams.delete('signup');
    searchParams.delete('reset-password');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Login onClose={handleClose} isOpen={shouldShowSignin} />
      <Signup onClose={handleClose} isOpen={shouldShowSignup} />
      <ResetPassword onClose={handleClose} isOpen={shouldShowPasswordReset} />
    </>
  );
};

export default Auth;
