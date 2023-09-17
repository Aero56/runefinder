import { useEffect, useRef, useCallback, useState } from 'react';
import Login from '@components/auth/Login';
import Signup from '@components/auth/Signup';
import { useSearchParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useAuth } from '@contexts/AuthContext';
import ResetPassword from './ResetPassword';

const Auth = () => {
  const { user } = useAuth();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [shouldUnmount, setShouldUnmount] = useState(!!user);
  const [isLoginActive, setLoginActive] = useState(true);
  const [isSignupActive, setSignupActive] = useState(false);
  const [isResetPasswordActive, setIsResetPasswordActive] = useState(false);

  const shouldShowSignin = searchParams.has('signin');
  const shouldShowSignup = searchParams.has('signup');
  const shouldShowPasswordReset = searchParams.has('reset-password');
  const shouldShowDialog =
    shouldShowSignin || shouldShowSignup || shouldShowPasswordReset;

  useEffect(() => {
    if (shouldShowDialog) {
      setLoginActive(shouldShowSignin);
      setSignupActive(shouldShowSignup);
      setIsResetPasswordActive(shouldShowPasswordReset);
    }
  }, [
    shouldShowSignin,
    shouldShowSignup,
    shouldShowDialog,
    shouldShowPasswordReset,
  ]);

  useEffect(() => {
    if (shouldShowDialog) {
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
  }, [shouldShowDialog]);

  const handleClose = useCallback(() => {
    searchParams.delete('signin');
    searchParams.delete('signup');
    searchParams.delete('reset-password');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const ref = dialogRef.current;
    ref?.addEventListener('close', handleClose);
    return () => {
      ref?.removeEventListener('close', handleClose);
    };
  }, [handleClose]);

  const handleUnmount = () => {
    setShouldUnmount(!!user);
  };

  if (user && shouldUnmount) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      id="auth"
      className="modal"
      onTransitionEnd={handleUnmount}
    >
      <div className="modal-box max-w-md bg-black-pearl-900">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={handleClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        {isLoginActive && <Login onClose={handleClose} />}
        {isSignupActive && <Signup onClose={handleClose} />}
        {isResetPasswordActive && <ResetPassword onClose={handleClose} />}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Auth;
