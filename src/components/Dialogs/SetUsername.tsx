import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast/headless';
import { useNavigate, useSearchParams } from 'react-router-dom';

import queryClient from 'api/queryClient';
import Dialog from 'components/Dialog/Dialog';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import { useAuth } from 'contexts/AuthContext';
import useUpdatePlayerMutation from 'hooks/mutations/useUpdatePlayerMutation';

export const DIALOG_SET_USERNAME = 'set-username';

interface FormData {
  username: string;
}

const SetUsername = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync, isLoading } = useUpdatePlayerMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const handleClose = () => {
    searchParams.delete(DIALOG_SET_USERNAME);
    searchParams.delete('redirect');
    setSearchParams(searchParams);
  };

  const handleUpdatePlayerData = async (data: FormData) => {
    try {
      await mutateAsync(data.username).then(() =>
        toast('Success! Your player data has been updated.'),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    queryClient.invalidateQueries(['user', user?.id]);
    queryClient.invalidateQueries(['player', user?.id]);

    if (searchParams.has('redirect')) {
      navigate(`/player/${user?.id}`);
    } else {
      handleClose();
    }
  };

  const isOpen = searchParams.has(DIALOG_SET_USERNAME);

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} size="small">
      <DialogHeader title="Set RuneScape username" />
      <input
        className={`input w-full ${
          errors.username
            ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
            : ''
        }`}
        placeholder="Your username"
        {...register('username', { required: 'Username is required.' })}
      />
      {errors.username && (
        <p className="mt-2 text-sm text-error">{errors.username.message}</p>
      )}
      <DialogFooter
        primaryAction={{
          label: 'Set username',
          onClick: handleSubmit(handleUpdatePlayerData),
        }}
        isLoading={isLoading}
      />
    </Dialog>
  );
};

export default SetUsername;
