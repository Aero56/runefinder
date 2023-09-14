import { useCallback, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('signin')) {
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
  }, [searchParams]);

  const handleClose = useCallback(() => {
    searchParams.delete('signin');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const ref = dialogRef.current;
    ref?.addEventListener('close', handleClose);
    return () => {
      ref?.removeEventListener('close', handleClose);
    };
  }, [handleClose]);

  return (
    <dialog ref={dialogRef} id="login" className="modal">
      <div className="modal-box max-w-md bg-black-pearl-900">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4">Sign in to RuneFinder</h3>
        <form className="space-y-6" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="name@email.com"
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Your password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="input w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                defaultChecked={false}
                className="checkbox"
              />
              <label htmlFor="remember" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            <Link to="/" className="text-sm text-anzac-400 hover:underline">
              Lost Password?
            </Link>
          </div>
          <button className="btn w-full bg-anzac-400 hover:bg-anzac-300 text-black-pearl-900 mt-5">
            Sign in
          </button>
          <div className="text-sm font-medium flex justify-center">
            Don't have an account yet?
            <button
              type="button"
              className="ml-1 text-anzac-400 hover:underline"
              onClick={() => navigate('?signup')}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Login;
