import queryClient from '@api/queryClient';
import { useAuth } from '@contexts/AuthContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import useUpdatePlayerMutation from '@hooks/mutations/useUpdatePlayerMutation';
import useUserQuery from '@hooks/queries/useUserQuery';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast/headless';

interface FormData {
  username: string;
}

const PlayerSettings = () => {
  const { user } = useAuth();

  const { data: player } = useUserQuery();
  const { mutateAsync, isLoading } = useUpdatePlayerMutation();

  const { handleSubmit, register, reset } = useForm<FormData>();

  useEffect(() => {
    reset({ username: player?.username ?? '' });
  }, [player, reset]);

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
  };

  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-5">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Player settings
      </div>
      <div className="p-4">
        <h1 className="mb-1">RuneScape Username</h1>
        <div className="flex">
          <input
            className="input w-full max-w-xs"
            {...register('username')}
          ></input>
          <button
            className="btn ml-2 w-12 bg-anzac-400 p-0 text-black-pearl-950 hover:bg-anzac-300"
            onClick={handleSubmit(handleUpdatePlayerData)}
          >
            {!isLoading ? (
              <ArrowPathIcon className="h-6 w-6" />
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
