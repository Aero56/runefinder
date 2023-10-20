import useGroupsQuery from '@hooks/queries/useGroupsQuery';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/Dialogs/CreateParty';
import Select, { Option } from '@components/Select';
import { useState } from 'react';
import Group from '@components/Group';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const Home = () => {
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
            <Group group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
