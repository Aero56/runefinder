import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Dialog from '../Dialog/Dialog';
import { Option } from '../Select';

import { DIALOG_SET_USERNAME } from './SetUsername';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import ActivitySelect from 'components/ActivitySelect';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import ExperienceSelect, { Experience } from 'components/ExperienceSelect';
import ModeSelect, { Gamemode } from 'components/ModeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/Tooltip';
import { useAuth } from 'contexts/AuthContext';
import useCreateGroupMutation from 'hooks/mutations/useCreateGroupMutation';
import { Raid } from 'types/raids';

const DEFAULT_SIZE = 10;

interface FormData {
  name: string;
  activity: Option<Raid | null>;
  size: string;
  experience: Option<Experience | null>;
  world: number;
  gamemode: Option<Gamemode | null>;
  split: boolean;
  kills?: number;
}

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user, data } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { mutateAsync: createGroup, isLoading } = useCreateGroupMutation();

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
    if (!user) {
      navigate('?signin');
      return;
    }

    if (!data?.username) {
      navigate(`?${DIALOG_SET_USERNAME}`);
      return;
    }

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
        gamemode: data.gamemode?.value ?? null,
        world: data.world,
        split: data.split,
        kills: data.kills || null,
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
    queryClient.invalidateQueries(['player', user!.id]);
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
          className="btn btn-primary hidden font-bold xs:flex"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
          Create group
        </button>
        <button
          className={`btn btn-circle btn-primary fixed right-6 flex shadow xs:hidden ${
            user ? 'bottom-24' : 'bottom-8'
          }`}
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogHeader title="Create group" />
        <form
          className="row-auto grid grid-cols-4 gap-x-6 gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-full row-start-1 flex items-center justify-between">
            <div>
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
            <div className="flex flex-col gap-0 xs:flex-row xs:gap-2">
              <label
                htmlFor="split"
                className="mb-1 block whitespace-nowrap text-sm"
              >
                Split
              </label>
              <Controller
                control={control}
                name="split"
                render={({ field: { onChange } }) => (
                  <input
                    id="split"
                    onChange={onChange}
                    type="checkbox"
                    placeholder="302"
                    className={`toggle toggle-primary text-black-pearl-100`}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4 row-start-2">
            <label htmlFor="name" className="mb-2 block text-sm">
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
            <label htmlFor="experience" className="mb-2 block text-sm">
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
            <label htmlFor="gamemode" className="mb-2 block text-sm">
              Mode
            </label>
            <Tooltip enabled={!data?.stats?.gamemode}>
              <TooltipTrigger>
                <Controller
                  control={control}
                  name="gamemode"
                  render={({ field: { onChange, value } }) => (
                    <ModeSelect
                      value={value}
                      onChange={onChange}
                      className="w-full"
                      disabled={!data?.stats?.gamemode}
                    />
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                Only ironmans can limit groups to a specific gamemode
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="col-span-2 row-start-5 xs:row-start-4">
            <label htmlFor="world" className="mb-2 block text-sm">
              World
            </label>
            <Controller
              control={control}
              name="world"
              render={({ field: { onChange, value } }) => (
                <input
                  id="world"
                  value={value ?? ''}
                  onChange={onChange}
                  type="number"
                  placeholder="302"
                  min={0}
                  className={`input  w-full ${
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
          <div className="col-span-2 row-start-5 xs:row-start-4">
            <label
              htmlFor="kills"
              className="mb-2 block whitespace-nowrap text-sm"
            >
              Minimum kills
            </label>
            <Controller
              control={control}
              name="kills"
              render={({ field: { onChange, value } }) => (
                <input
                  id="kills"
                  value={value ?? ''}
                  onChange={onChange}
                  type="number"
                  min={0}
                  placeholder="50"
                  className={`input w-full`}
                />
              )}
            />
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

export default CreateGroup;
