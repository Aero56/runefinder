import { Link, useNavigate } from 'react-router-dom';
import useGroupsQuery from '@hooks/queries/useGroupsQuery';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/Dialogs/CreateParty';
import Select, { Option } from '@components/Select';
import { MouseEvent, useState } from 'react';
import useUpdateUserMutation from '@hooks/mutations/useUpdateUserMutation';
import toast from 'react-hot-toast/headless';
import { Group } from '@/types/group';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [selected, setSelected] = useState<Option[]>([OPTIONS[0]]);

  const { data: groups, isLoading } = useGroupsQuery({
    order: { column: 'updated_at', options: { ascending: false } },
  });

  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUserMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChangeFilter = (selected: Option[]) => {
    setSelected(selected);
  };

  const handleJoinGroup = async (group: Group) => {
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
    <div className="container pt-4">
      <div className="flex justify-between">
        <Select
          value={selected}
          options={OPTIONS}
          onChange={handleChangeFilter}
          isMulti
        />
        {user && <CreateParty />}
      </div>
      {groups && (
        <div className="mt-5 flex flex-col gap-5">
          {groups.map((group) => (
            <button
              key={group.id}
              className="rounded bg-black-pearl-900 p-4 transition-colors duration-300 hover:bg-gray-900"
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
