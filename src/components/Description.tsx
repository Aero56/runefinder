import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useUpdateUserMutation from 'hooks/mutations/useUpdateUserMutation';

interface DescriptionProps {
  value: string | null;
}

const Description = ({ value }: DescriptionProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState<string | undefined>(
    value ?? undefined,
  );

  const { mutateAsync, isLoading } = useUpdateUserMutation();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    const value = ref.current?.value.trim();

    if (value) {
      try {
        await mutateAsync({ description: value }).then(() => {
          setDescription(value);
          setIsEditing(false);
        });
      } catch (error) {
        if (error instanceof Error) {
          toast('Something went wrong!');
          return;
        }
      }
    }
  };

  if (!isEditing) {
    return (
      <div
        className="-mx-2 -my-1 cursor-pointer rounded-lg px-2 py-1 text-sm transition-colors hover:bg-black-pearl-800"
        onClick={handleEdit}
      >
        {!description ? (
          <p className="text-slate-400">Tell something about yourself...</p>
        ) : (
          <p>{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <textarea
        ref={ref}
        defaultValue={description}
        className="textarea textarea-bordered h-32 w-full"
        onKeyDown={handleCancel}
        autoFocus
        onFocus={(e) => {
          const val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
      />
      <button className="btn btn-primary btn-sm mt-2" onClick={handleSave}>
        {!isLoading ? (
          'Save'
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </button>
    </div>
  );
};

export default Description;
