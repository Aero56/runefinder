import useGroupsQuery from '@hooks/queries/useGroupsQuery';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/Dialogs/CreateParty';
import { Option } from '@components/Select';
import { useState } from 'react';
import Group from '@components/Group';
import ActivitySelect, { ACTIVITIES } from '@components/ActivitySelect';
import { Raid } from '@/types/raids';

const Home = () => {
  const { user } = useAuth();

  const [selected, setSelected] = useState<Option<Raid | null>>(ACTIVITIES[0]);

  const { data: groups, isLoading } = useGroupsQuery(
    { type: selected?.value ? Number(selected?.value) : undefined },
    {
      order: { column: 'updated_at', options: { ascending: false } },
    },
  );

  const handleChangeFilter = (selected: Option<Raid | null>) => {
    setSelected(selected);
  };

  return (
    <div className="container pt-4">
      <div className="flex justify-between">
        <ActivitySelect value={selected} onChange={handleChangeFilter} />
        {user && <CreateParty />}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        groups && (
          <div className="mt-5 flex flex-col gap-5">
            {groups.map((group) => (
              <Group key={group.id} group={group} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
