import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Raid } from '@/types/raids';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import Select, { Option } from '../Select';
import useGroupMutation from '@hooks/mutations/useGroupMutation';
import toast from 'react-hot-toast/headless';
import Dialog from '../Dialog/Dialog';
import DialogFooter from '@components/Dialog/DialogFooter';
import DialogHeader from '@components/Dialog/DialogHeader';

const DEFAULT_SIZE = 10;

export const ACTIVITIES = [
  { label: 'Anything', value: null },
  {
    label: 'Raids',
    options: [
      {
        label: 'Theatre of Blood',
        value: Raid.TheatreOfBlood,
        entity: { teamSize: 4 },
      },
      {
        label: 'Chambers of Xeric',
        value: Raid.ChambersOfXeric,
        entity: { teamSize: 100 },
      },
      {
        label: 'Tombs of Amascut',
        value: Raid.TombsOfAmascut,
        entity: { teamSize: 8 },
      },
    ],
  },
  { label: 'Test', options: [{ label: 'Test', value: 'test' }] },
];

interface FormData {
  name: string;
  players: number;
  activity: Option[];
  size: number;
}

const CreateParty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { mutateAsync: createGroup, isLoading } = useGroupMutation();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const handleCreateParty = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    if (user) {
      const { data } = await supabase
        .from('groups')
        .select('id')
        .eq('created_by', user.id)
        .eq('status', 'open');

      if (data?.length) {
        setIsConfirmationOpen(true);
        setIsOpen(false);
        return;
      }

      handleCreateGroup();
    }
  };

  const selectedActivity = watch('activity');

  useEffect(() => {
    setValue('size', 1);
  }, [selectedActivity, setValue]);

  const handleConfirm = async () => {
    handleCreateGroup();
  };

  const handleConfirmCancel = () => {
    setIsConfirmationOpen(false);
    setIsOpen(true);
  };

  const handleCreateGroup = async () => {
    const data = getValues();

    let result;

    try {
      result = await createGroup({
        name: data.name,
        size: data.activity[0].entity?.teamSize
          ? Number(data.size) + 1
          : DEFAULT_SIZE,
        type: data.activity[0].value ? Number(data.activity[0].value) : null,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    navigate('/group/' + result?.id);
    setIsConfirmationOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleCreateParty}>
        <button
          className="btn hidden bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300 xs:flex"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
          Create party
        </button>
        <button
          className="btn btn-circle fixed bottom-6 right-6 flex border-none bg-anzac-400 text-black-pearl-900 shadow hover:bg-anzac-300 xs:hidden"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogHeader title="Create party" />
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              control={control}
              name="activity"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  options={ACTIVITIES}
                  onChange={onChange}
                  placeholder="Choose activity"
                  {...(errors.activity && {
                    className:
                      'outline outline-2 outline-error/50 focus:outline-error',
                  })}
                />
              )}
              rules={{ required: 'Please select an activity.' }}
            />
            {errors.activity && (
              <p className="mt-2 text-sm text-error">
                {errors.activity.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Party name
            </label>
            <input
              id="name"
              type="text"
              placeholder="This is a party name"
              className={`input w-full bg-black-pearl-950 ${
                errors.name
                  ? 'outline outline-2 outline-offset-2 outline-error/50 focus:outline-error'
                  : ''
              }`}
              {...register('name', {
                required: 'Name is required.',
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-error">{errors.name.message}</p>
            )}
          </div>
          {selectedActivity && selectedActivity[0].entity?.teamSize && (
            <div>
              <label htmlFor="email" className="mb-2 block text-sm">
                {`Players needed: ${watch('size')}`}
              </label>
              <input
                type="range"
                min={1}
                max={selectedActivity[0].entity.teamSize - 1}
                className="range range-primary"
                {...register('size')}
              />
            </div>
          )}
        </form>
        <DialogFooter
          primaryAction={{
            label: 'Create group',
            onClick: handleSubmit(onSubmit),
          }}
          isLoading={isLoading}
        />
      </Dialog>

      <Dialog
        isOpen={isConfirmationOpen}
        onClose={handleConfirmCancel}
        size="small"
      >
        <DialogHeader title="You already have an open group" />
        <p>
          Are you sure you want to create a new group? Your current group will
          be closed.
        </p>
        <DialogFooter
          primaryAction={{ label: 'Confirm', onClick: handleConfirm }}
          secondaryAction={{ label: 'Cancel', onClick: handleConfirmCancel }}
          isLoading={isLoading}
          isCompact
        />
      </Dialog>
    </>
  );
};

export default CreateParty;
