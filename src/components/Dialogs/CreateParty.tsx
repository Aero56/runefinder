import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast/headless';
import { useNavigate } from 'react-router-dom';

import Dialog from '../Dialog/Dialog';
import { Option } from '../Select';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import ActivitySelect from 'components/ActivitySelect';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import ExperienceSelect, { Experience } from 'components/ExperienceSelect';
import ModeSelect, { Mode } from 'components/ModeSelect';
import { useAuth } from 'contexts/AuthContext';
import useGroupMutation from 'hooks/mutations/useGroupMutation';
import { Raid } from 'types/raids';

const DEFAULT_SIZE = 10;

interface FormData {
  name: string;
  players: number;
  activity: Option<Raid | null>;
  size: string;
  experience: Option<Experience | null>;
  world: number;
  mode: Option<Mode | null>;
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

  const handleCreateGroup = async () => {
    const data = getValues();

    let result;

    try {
      result = await createGroup({
        name: data.name,
        size: data.activity.entity?.teamSize
          ? Number(data.size) + 1
          : DEFAULT_SIZE,
        type: data.activity?.value ?? null,
        level: data.experience?.value ?? null,
        mode: data.mode?.value ?? null,
        world: data.world,
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

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['user', user!.id]);
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
    setValue('size', '1');
  }, [selectedActivity, setValue]);

  const handleConfirm = async () => {
    handleCreateGroup();
  };

  const handleConfirmCancel = () => {
    setIsConfirmationOpen(false);
    setIsOpen(true);
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
          className="btn btn-circle fixed bottom-24 right-6 flex border-none bg-anzac-400 text-black-pearl-900 shadow hover:bg-anzac-300 xs:hidden"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogHeader title="Create party" />
        <form
          className="row-auto grid grid-cols-4 gap-x-6 gap-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-full row-start-1">
            <Controller
              control={control}
              name="activity"
              render={({ field: { onChange, value } }) => (
                <ActivitySelect
                  value={value}
                  onChange={onChange}
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
          <div className="col-span-4 row-start-2">
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
                required: 'Please enter a party name.',
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-error">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-full row-start-3 xs:col-span-2">
            <label htmlFor="email" className="mb-2 block text-sm">
              Experience level
            </label>
            <Controller
              control={control}
              name="experience"
              render={({ field: { onChange, value } }) => (
                <ExperienceSelect
                  value={value}
                  onChange={onChange}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="col-span-full row-start-4 xs:col-span-2 xs:row-start-3">
            <label htmlFor="email" className="mb-2 block text-sm">
              Mode
            </label>
            <Controller
              control={control}
              name="mode"
              render={({ field: { onChange, value } }) => (
                <ModeSelect
                  value={value}
                  onChange={onChange}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="col-span-full row-start-5  xs:row-start-4">
            <label htmlFor="email" className="mb-2 block text-sm">
              World
            </label>
            <Controller
              control={control}
              name="world"
              render={({ field: { onChange } }) => (
                <input
                  onChange={onChange}
                  type="number"
                  placeholder="302"
                  className={`input w-24 ${
                    errors.world
                      ? 'outline outline-2 outline-error/50 focus:outline-error'
                      : ''
                  }`}
                />
              )}
              rules={{ required: 'Please enter the world you are in.' }}
            />
            {errors.world && (
              <p className="mt-2 text-sm text-error">{errors.world.message}</p>
            )}
          </div>
          {selectedActivity && selectedActivity.entity?.teamSize && (
            <div className="col-span-full row-start-6 xs:row-start-5">
              <label htmlFor="email" className="mb-2 block text-sm">
                {`Players needed: ${watch('size')}`}
              </label>
              <input
                type="range"
                min={1}
                max={selectedActivity.entity.teamSize - 1}
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
