import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import queryClient from 'api/queryClient';
import { useAuth } from 'contexts/AuthContext';
import useUpdateUserMutation from 'hooks/mutations/useUpdateUserMutation';

interface DescriptionProps {
  value: string | null;
}

interface FormData {
  description: string;
}

const MAX_DESCRIPTION_LENGTH = 150;

const Description = ({ value }: DescriptionProps) => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState<string | undefined>(
    value ?? undefined,
  );

  const { handleSubmit, register, watch } = useForm<FormData>({
    defaultValues: { description },
  });

  const { mutateAsync, isLoading } = useUpdateUserMutation();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleSave = async (data: FormData) => {
    const description = data.description;

    try {
      await mutateAsync({ description }).then(() => {
        setDescription(description);
        setIsEditing(false);
      });
    } catch (error) {
      if (error instanceof Error) {
        toast('Something went wrong!');
        return;
      }
    }

    queryClient.invalidateQueries(['player', user?.id]);
  };

  const descriptionField = watch('description');

  if (!isEditing) {
    return (
      <div
        className="-mx-2 -my-1 cursor-pointer rounded-lg px-2 py-1 text-sm transition-colors hover:bg-black-pearl-800"
        onClick={handleEdit}
      >
        {!description ? (
          <p className="text-slate-400">Tell something about yourself...</p>
        ) : (
          <p className="text-wrap break-words">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <textarea
        className="textarea textarea-bordered h-32 w-full"
        onKeyDown={handleCancel}
        autoFocus
        onFocus={(e) => {
          const val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
        {...register('description', { maxLength: MAX_DESCRIPTION_LENGTH })}
      />
      <div className="mt-2 flex items-center gap-2">
        <p
          className={`text-sm ${
            descriptionField?.length > MAX_DESCRIPTION_LENGTH
              ? 'text-red-500'
              : ''
          }`}
        >{`${descriptionField?.length ?? 0}/${MAX_DESCRIPTION_LENGTH}`}</p>
        <button
          className="btn btn-primary btn-sm w-14"
          onClick={handleSubmit(handleSave)}
        >
          {!isLoading ? (
            'Save'
          ) : (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Description;
