import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from 'contexts/AuthContext';
import useUpdateAuthMutation from 'hooks/mutations/useUpdateAuthMutation';

interface FormData {
  email: string;
}

const ChangeEmail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutateAsync: updateAuth, isLoading } = useUpdateAuthMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ email }: FormData) => {
    try {
      await updateAuth({ email });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast(
      'Success! An email has been sent to the new email address for confirmation.',
    );
    navigate('/settings');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 mt-12 w-full max-w-md rounded-2xl bg-black-pearl-900 p-6">
        <h3 className="mb-4 text-xl font-bold">Change your email</h3>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Current email
            </label>
            <p className="rounded-lg bg-black-pearl-950 px-4 py-3">
              {user?.email}
            </p>
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              New email
            </label>
            <input
              id="email"
              type="email"
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
          <button className="btn btn-primary mt-5 w-full font-bold">
            {!isLoading ? (
              'Change email'
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
