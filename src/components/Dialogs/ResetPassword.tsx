import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Dialog from 'components/Dialog/Dialog';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import useResetPasswordMutation from 'hooks/mutations/useResetPasswordMutation';

interface FormData {
  email: string;
}

interface ResetPasswordProps {
  onClose: () => void;
  isOpen: boolean;
}

const ResetPassword = ({ onClose, isOpen }: ResetPasswordProps) => {
  const navigate = useNavigate();

  const { mutateAsync: resetPassword, isLoading } = useResetPasswordMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ email }: FormData) => {
    try {
      await resetPassword(email);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast(
      'Success! An email has been sent with a link to reset your password.',
    );
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="small">
      <DialogHeader title="Forgot password?" />
      <h4 className="mb-4 text-sm">
        Please provide your email address, an email will be sent with a link to
        reset your password.
      </h4>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm">
            Email
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
        <DialogFooter
          primaryAction={{
            label: 'Reset password',
            onClick: handleSubmit(onSubmit),
          }}
          isLoading={isLoading}
        />
        <div className="text-center text-sm font-medium">
          Remember your password again?
          <span
            className="ml-1 cursor-pointer text-anzac-400 hover:underline"
            onClick={() => navigate('?signin')}
          >
            Sign in
          </span>
        </div>
      </form>
    </Dialog>
  );
};

export default ResetPassword;
