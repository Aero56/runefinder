import { Link, useNavigate } from 'react-router-dom';
import useGroupsQuery from '@hooks/queries/useGroupsQuery';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/Dialogs/CreateParty';
import Select, { Option } from '@components/Select';
import { useState } from 'react';

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChangeFilter = (selected: Option[]) => {
    setSelected(selected);
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
  );
};

export default Home;
