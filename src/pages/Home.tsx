import useGroupsQuery from '@hooks/queries/useGroupsQuery';
import { useAuth } from '@contexts/AuthContext';
import CreateParty from '@components/Dialogs/CreateParty';
import { Option } from '@components/Select';
import { ChangeEvent, useState } from 'react';
import Group from '@components/Group';
import ActivitySelect from '@components/ActivitySelect';
import { Raid } from '@/types/raids';
import ModeSelect, { Mode } from '@components/ModeSelect';
import ExperienceSelect, { Experience } from '@components/ExperienceSelect';
import useDebounce from '@hooks/useDebounce';

const Home = () => {
  const { user } = useAuth();

  const [term, setTerm] = useState('');
  const debouncedValue = useDebounce(term);

  const [selectedActivity, setSelectedActivity] =
    useState<Option<Raid | null> | null>(null);
  const [selectedLevel, setSelectedLevel] =
    useState<Option<Experience | null> | null>(null);
  const [selectedMode, setSelectedMode] = useState<Option<Mode | null> | null>(
    null,
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const { data: groups, isLoading } = useGroupsQuery(
    {
      name: debouncedValue ? debouncedValue.trim() : undefined,
      type: selectedActivity?.value ? selectedActivity.value : undefined,
      level: selectedLevel?.value ? selectedLevel.value : undefined,
      mode: selectedMode?.value ? selectedMode.value : undefined,
    },
    {
      order: { column: 'updated_at', options: { ascending: false } },
    },
  );

  const handleChangeActivity = (selected: Option<Raid | null>) => {
    setSelectedActivity(selected);
  };

  const handleChangeLevel = (selected: Option<Experience | null>) => {
    setSelectedLevel(selected);
  };

  const handleChangeMode = (selected: Option<Mode | null>) => {
    setSelectedMode(selected);
  };

  return (
    <div className="container pt-4">
      <div className="mb-3 flex justify-between">
        <input
          className="input w-full bg-black-pearl-900 xs:w-auto"
          placeholder="Search groups..."
          onChange={handleSearch}
        />
        {user && <CreateParty />}
      </div>
      <div className="flex flex-wrap gap-3">
        <ActivitySelect
          value={selectedActivity}
          onChange={handleChangeActivity}
          className="w-full xs:w-auto"
        />
        <ExperienceSelect
          value={selectedLevel}
          onChange={handleChangeLevel}
          className="flex-grow xs:flex-grow-0"
        />
        <ModeSelect
          value={selectedMode}
          onChange={handleChangeMode}
          className="flex-grow xs:flex-grow-0"
        />
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
