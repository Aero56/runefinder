import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignupMutation from '@hooks/useSignupMutation';
import toast from 'react-hot-toast/headless';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
  onClose: () => void;
}

const Signup = ({ onClose }: SignupProps) => {
  const navigate = useNavigate();

  const { mutateAsync: signup, isLoading } = useSignupMutation();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast('Success! Your account was created and you have been logged in.');
    onClose();
  };

  return (
    <>
      <h3 className="font-bold text-xl mb-4">Create account on RuneFinder</h3>
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
                message: 'Your password can not be longer than 128 characters.',
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-error mt-2">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className={`input w-full ${
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
            <p className="text-sm text-error mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className="btn w-full bg-anzac-400 hover:bg-anzac-300 text-black-pearl-900 mt-5">
          {!isLoading ? (
            'Sign up'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
        <div className="text-sm font-medium">
          Already have an account?
          <span
            className="ml-1 text-anzac-400 hover:underline cursor-pointer"
            onClick={() => navigate('?signin')}
          >
            Sign in
          </span>
        </div>
      </form>
    </>
  );
};

export default Signup;