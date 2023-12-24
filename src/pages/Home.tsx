import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ActivitySelect from 'components/ActivitySelect';
import CreateParty from 'components/Dialogs/CreateParty';
import ExperienceSelect, { Experience } from 'components/ExperienceSelect';
import Group from 'components/Group';
import ModeSelect, { Gamemode } from 'components/ModeSelect';
import { Option } from 'components/Select';
import { useAuth } from 'contexts/AuthContext';
import useGroupsQuery from 'hooks/queries/useGroupsQuery';
import useDebounce from 'hooks/useDebounce';
import { Raid } from 'types/raids';

const Home = () => {
  const { user } = useAuth();

  const [term, setTerm] = useState('');
  const debouncedValue = useDebounce(term);

  const [selectedActivity, setSelectedActivity] =
    useState<Option<Raid | null> | null>(null);
  const [selectedLevel, setSelectedLevel] =
    useState<Option<Experience | null> | null>(null);
  const [selectedMode, setSelectedMode] =
    useState<Option<Gamemode | null> | null>(null);

  const { ref, inView } = useInView();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const {
    data: groups,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGroupsQuery(
    {
      name: debouncedValue ? debouncedValue.trim() : undefined,
      type: selectedActivity?.value ? selectedActivity.value : undefined,
      level: selectedLevel?.value ? selectedLevel.value : undefined,
      gamemode: selectedMode?.value ? selectedMode.value : undefined,
    },
    {
      order: { column: 'updated_at', options: { ascending: false } },
    },
    { keepPreviousData: true },
  );

  const handleChangeActivity = (selected: Option<Raid | null>) => {
    setSelectedActivity(selected);
  };

  const handleChangeLevel = (selected: Option<Experience | null>) => {
    setSelectedLevel(selected);
  };

  const handleChangeMode = (selected: Option<Gamemode | null>) => {
    setSelectedMode(selected);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
      <div className="mb-8 flex flex-wrap gap-3">
        <ActivitySelect
          value={selectedActivity}
          onChange={handleChangeActivity}
          className="w-full xs:w-auto"
          tint="light"
        />
        <ExperienceSelect
          value={selectedLevel}
          onChange={handleChangeLevel}
          className="flex-grow xs:flex-grow-0"
          tint="light"
        />
        <ModeSelect
          value={selectedMode}
          onChange={handleChangeMode}
          className="flex-grow xs:flex-grow-0"
          tint="light"
          isFilter
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        groups && (
          <>
            <div className="mb-5 flex flex-col gap-5">
              {groups.pages.map(
                (page) =>
                  page?.map((group) => <Group key={group.id} group={group} />),
              )}
            </div>
            {hasNextPage && (
              <button
                ref={ref}
                className="btn mx-auto mb-5 flex border-none bg-black-pearl-900 hover:bg-black-pearl-800"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Loading more
                  </>
                ) : (
                  'Load more'
                )}
              </button>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Home;
