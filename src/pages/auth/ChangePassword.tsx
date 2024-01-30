import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { supabase } from 'api/supabase';
import useUpdateAuthMutation from 'hooks/mutations/useUpdateAuthMutation';

interface FormData {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();

  const { mutateAsync: updateAuth, isLoading } = useUpdateAuthMutation();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ password }: FormData) => {
    try {
      await updateAuth({ password });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast('Success! Your password has been changed.');
    navigate('/settings');
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session && event !== 'PASSWORD_RECOVERY') {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 mt-12 w-full max-w-md rounded-2xl bg-black-pearl-900 p-6">
        <h3 className="mb-4 text-xl font-bold">Change your password</h3>
        <form
          method="dialog"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              New password
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
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                  message:
                    'Your password should contain atleast one letter and one number.',
                },
                minLength: {
                  value: 6,
                  message:
                    'Your password should contain a minimum of 6 characters.',
                },
                maxLength: {
                  value: 128,
                  message:
                    'Your password can not be longer than 128 characters.',
                },
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-error">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`input w-full bg-black-pearl-950 ${
                errors.confirmPassword
                  ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
                  : ''
              }`}
              {...register('confirmPassword', {
                validate: (value) =>
                  value === watch('password', '') || 'Passwords do not match.',
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button className="btn btn-primary mt-5 w-full font-bold">
            {!isLoading ? (
              'Change password'
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
