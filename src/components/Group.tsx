import { Group as GroupType } from '@/types/group';
import useUpdateUserMutation from '@hooks/mutations/useUpdateUserMutation';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast/headless';
import { Link, useNavigate } from 'react-router-dom';

interface GroupProps {
  group: GroupType;
}

const Group = ({ group }: GroupProps) => {
  const navigate = useNavigate();

  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUserMutation();

  const handleJoinGroup = async (group: GroupType) => {
    try {
      await updateUser({ group: group.id });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      return;
    }

    toast(`You joined group "${group.name}"!`);
    navigate(`/group/${group.id}`);
  };

  return (
    <div
      key={group.id}
      className="cursor-pointer rounded bg-black-pearl-900 p-4 transition-colors duration-300 hover:bg-gray-900"
      onClick={() => navigate(`/group/${group.id}`)}
    >
      <div className="flex justify-between">
        <div className="flex flex-col text-left">
          <p>{group.name}</p>
          <p>
            {group.users.map((user, i) => (
              <span key={user.id}>
                {i > 0 && ', '}
                <Link
                  to={`/player/${user.username}`}
                  className="font-medium text-anzac-400 hover:underline"
                >
                  {user.username}
                </Link>
              </span>
            ))}
          </p>
        </div>
        <button
          className="btn btn-ghost w-16"
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            handleJoinGroup(group);
          }}
        >
          {!isUpdateUserLoading ? (
            'Join'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Group;
