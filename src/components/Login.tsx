import { useCallback, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLoginMutation from '@hooks/useLoginMutation';
import toast from 'react-hot-toast/headless';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const { mutateAsync: login, isLoading } = useLoginMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

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

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast('Success! You are now logged in.');
    handleClose();
  };

  return (
    <dialog ref={dialogRef} id="login" className="modal">
      <div className="modal-box max-w-md bg-black-pearl-900">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-xl mb-4">Sign in to RuneFinder</h3>
        <form
          method="dialog"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Your email
            </label>
            <input
              id="email"
              type="text"
              placeholder="name@email.com"
              className={`input w-full ${
                errors.email
                  ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
                  : ''
              }`}
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address.',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-error mt-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Your password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`input w-full ${
                errors.password
                  ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
                  : ''
              }`}
              {...register('password', {
                required: 'Password is required.',
              })}
            />
            {errors.password && (
              <p className="text-sm text-error mt-2">
                {errors.password.message}
              </p>
            )}
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
            {!isLoading ? (
              'Sign in'
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <div className="text-sm font-medium ">
            Don't have an account yet?
            <span
              className="ml-1 text-anzac-400 hover:underline cursor-pointer"
              onClick={() => navigate('?signup')}
            >
              Create account
            </span>
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
