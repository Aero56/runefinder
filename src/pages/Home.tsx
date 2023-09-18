import { Link, useNavigate } from 'react-router-dom';
import useGroupsQuery from '@hooks/useGroupsQuery';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/CreateParty';
import { useState } from 'react';
import Select, { Option } from '@components/Select';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [isCreatingParty, setCreatingParty] = useState(false);

  const { data: groups, isLoading } = useGroupsQuery({
    order: { column: 'updated_at', options: { ascending: false } },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleOpenCreateDialog = () => {
    setCreatingParty(true);
  };

  const handleCloseCreateDialog = () => {
    setCreatingParty(false);
  };

  const handleChangeFilter = (selected: Option[]) => {
    console.log(selected);
  };

  return (
    <>
      <div className="container pt-4">
        <div className="flex justify-between">
          <Select
            label="Filters"
            options={OPTIONS}
            onChange={handleChangeFilter}
            multiSelect
          />
          {user && (
            <>
              <button
                className="btn hidden bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300 xs:flex"
                onClick={handleOpenCreateDialog}
              >
                <PlusIcon className="h-6 w-6" />
                Create party
              </button>
              <button
                className="btn btn-circle fixed bottom-6 right-6 flex border-none bg-anzac-400 text-black-pearl-900 shadow hover:bg-anzac-300 xs:hidden"
                onClick={handleOpenCreateDialog}
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        {groups && (
          <div className="mt-5 flex flex-col gap-5">
            {groups.map((group) => (
              <button
                key={group.id}
                className="flex flex-col rounded bg-black-pearl-900 p-4 transition-colors duration-300 hover:bg-gray-900"
                onClick={() => navigate(`/group/${group.id}`)}
              >
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
              </button>
            ))}
          </div>
        )}
      </div>

      <CreateParty isOpen={isCreatingParty} onClose={handleCloseCreateDialog} />
    </>
  );
};

export default Home;
