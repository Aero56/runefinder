import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Dialog from 'components/Dialog/Dialog';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import useLoginMutation from 'hooks/mutations/useLoginMutation';
import useLoginWithProviderMutation from 'hooks/mutations/useLoginWithProviderMutation';
import { AuthProviders } from 'types/supabase';

interface FormData {
  email: string;
  password: string;
}

interface LoginProps {
  onClose: () => void;
  isOpen: boolean;
}

const Login = ({ onClose, isOpen }: LoginProps) => {
  const navigate = useNavigate();

  const { mutateAsync: login, isLoading } = useLoginMutation();
  const { mutateAsync: loginWithProvider, isSuccess: isLoginProviderSuccess } =
    useLoginWithProviderMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

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
    onClose();
  };

  const handleLoginWithProvider = async (provider: AuthProviders) => {
    try {
      await loginWithProvider({ provider });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="small">
      <DialogHeader title="Sign in to RuneFinder" />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm">
            Your email
          </label>
          <input
            id="email"
            type="text"
            placeholder="name@email.com"
            className={`input w-full bg-black-pearl-950 ${
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
            <p className="mt-2 text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm">
            Your password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={`input w-full bg-black-pearl-950 ${
              errors.password
                ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
                : ''
            }`}
            {...register('password', {
              required: 'Password is required.',
            })}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-error">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
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
          <Link
            to="?reset-password"
            className="text-sm text-anzac-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <DialogFooter
          primaryAction={{ label: 'Sign in', onClick: handleSubmit(onSubmit) }}
          isLoading={isLoading}
        />
        <div className="text-center text-sm font-medium">
          Don't have an account yet?
          <span
            className="ml-1 cursor-pointer text-anzac-400 hover:underline"
            onClick={() => navigate('?signup')}
          >
            Create account
          </span>
        </div>
      </form>
      <div className="my-5 flex w-full items-center justify-between space-x-3 opacity-50">
        <div className="h-[1px] grow bg-black-pearl-100"></div>
        <div className="shrink-0 font-medium">OR</div>
        <div className="h-[1px] grow bg-black-pearl-100"></div>
      </div>
      <div className="space-y-4">
        <button
          className="btn w-full border-none bg-black-pearl-800 font-bold hover:bg-black-pearl-700/50"
          onClick={() => handleLoginWithProvider(AuthProviders.Google)}
        >
          {!isLoginProviderSuccess ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign in with Google
            </>
          ) : (
            <span className="loading loading-spinner" />
          )}
        </button>
      </div>
    </Dialog>
  );
};

export default Login;
