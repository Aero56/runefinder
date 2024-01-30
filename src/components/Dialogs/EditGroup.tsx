import { PencilIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Dialog from '../Dialog/Dialog';
import { Option } from '../Select';

import queryClient from 'api/queryClient';
import DialogFooter from 'components/Dialog/DialogFooter';
import DialogHeader from 'components/Dialog/DialogHeader';
import ExperienceSelect, {
  EXPERIENCE_TYPES,
  Experience,
} from 'components/ExperienceSelect';
import ModeSelect, { GAMEMODES, Gamemode } from 'components/ModeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/Tooltip';
import { useAuth } from 'contexts/AuthContext';
import useUpdateGroupMutation from 'hooks/mutations/useUpdateGroupMutation';
import { ActivityType } from 'types/activities';
import { Group } from 'types/groups';

const MAX_NAME_LENGTH = 150;

interface EditPartyProps {
  group: Group;
}

interface FormData {
  name: string;
  experience: Option<Experience | null>;
  world: number;
  gamemode: Option<Gamemode | null>;
  split: boolean;
  kills?: number;
}

const EditGroup = ({ group }: EditPartyProps) => {
  const { data } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: updateGroup, isLoading } = useUpdateGroupMutation();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: group.name,
      split: group.split,
      experience: EXPERIENCE_TYPES.find(
        (experience) => experience.value === group.level,
      ),
      gamemode: GAMEMODES.find((gamemode) => gamemode.value === group.gamemode),
      world: group.world,
      kills: group.kills ?? undefined,
    },
  });

  const handleEditParty = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUpdateGroup = async () => {
    const data = getValues();

    try {
      await updateGroup({
        id: group.id,
        name: data.name,
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

    setIsOpen(false);

    queryClient.invalidateQueries(['groups']);
    queryClient.invalidateQueries(['group', group.id]);
  };

  return (
    <>
      <button
        className="btn btn-circle btn-ghost btn-sm ml-2"
        onClick={handleEditParty}
      >
        <PencilIcon className="h-5 w-5 [&>path]:stroke-[2.5]" />
      </button>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogHeader title="Edit group" />
        <form
          className="row-auto grid grid-cols-4 gap-x-6 gap-y-4"
          onSubmit={handleSubmit(handleUpdateGroup)}
        >
          <div className="col-span-full row-start-1 flex items-center justify-end">
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
                render={({ field: { onChange, value } }) => (
                  <input
                    id="split"
                    checked={value}
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
                maxLength: {
                  value: MAX_NAME_LENGTH,
                  message: 'Party name can not be longer than 150 characters.',
                },
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
                  value={value}
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
          {group.activity.type !== ActivityType.Minigame && (
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
          )}
        </form>
        <DialogFooter
          primaryAction={{
            label: 'Save',
            onClick: handleSubmit(handleUpdateGroup),
          }}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default EditGroup;
