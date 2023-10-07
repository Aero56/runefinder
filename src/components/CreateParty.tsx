import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { Raid } from '@/types/raids';
import Select, { Option } from './Select';
import useGroupMutation from '@hooks/useGroupMutation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: createGroup, isLoading } = useGroupMutation();

  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: FormData) => {
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
      }

      return;
    }

    navigate('/group/' + result.id);
  };

  const selectedActivity = watch('activity');

  useEffect(() => {
    setValue('size', 1);
  }, [selectedActivity, setValue]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
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
      <FloatingPortal>
        {isMounted && (
          <FloatingOverlay
            className="grid place-items-center bg-black-pearl-950/30 px-4"
            style={{ ...transitionStyles }}
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                style={{ ...transitionStyles }}
                {...getFloatingProps()}
                className="modal-box w-full max-w-2xl scale-100 bg-black-pearl-900"
              >
                <button
                  className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                  onClick={handleClose}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="mb-4 text-xl font-bold">Create party</h3>
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
                      <p className="mt-2 text-sm text-error">
                        {errors.name.message}
                      </p>
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
                  <button className="btn mt-5 w-full bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300">
                    {!isLoading ? (
                      'Create party'
                    ) : (
                      <span className="loading loading-spinner"></span>
                    )}
                  </button>
                </form>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};

export default CreateParty;
