import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  SessionStorageKey,
  getSessionStorageValue,
  setSessionStorageValue,
} from '../utils/sessionStorage';

import ActivitySelect, { Activity, Entity } from 'components/ActivitySelect';
import CreateGroup from 'components/Dialogs/CreateGroup';
import ExperienceSelect, { Experience } from 'components/ExperienceSelect';
import Group from 'components/Group';
import GroupCardSkeleton from 'components/LoadingSkeletons/GroupCardSkeleton';
import ModeSelect, { Gamemode } from 'components/ModeSelect';
import { Option } from 'components/Select';
import useGroupsQuery from 'hooks/queries/useGroupsQuery';
import useDebounce from 'hooks/useDebounce';

const Groups = () => {
  const [term, setTerm] = useState(
    getSessionStorageValue(SessionStorageKey.GroupsSearchTerm) ?? '',
  );
  const debouncedValue = useDebounce(term);

  const [selectedActivity, setSelectedActivity] = useState<Option<
    Activity | null,
    Entity
  > | null>(getSessionStorageValue(SessionStorageKey.GroupsActivityFilter));
  const [selectedExperience, setSelectedExperience] =
    useState<Option<Experience | null> | null>(
      getSessionStorageValue(SessionStorageKey.GroupsExperienceFilter),
    );
  const [selectedMode, setSelectedMode] =
    useState<Option<Gamemode | null> | null>(
      getSessionStorageValue(SessionStorageKey.GroupsModeFilter),
    );
  const [isSplitEnabled, setIsSplitEnabled] = useState<boolean>(
    getSessionStorageValue(SessionStorageKey.GroupsSplitEnabled) ?? false,
  );

  const { ref, inView } = useInView();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTerm(value);
    setSessionStorageValue(SessionStorageKey.GroupsSearchTerm, value);
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
      level: selectedExperience?.value ? selectedExperience.value : undefined,
      gamemode: selectedMode?.value ? selectedMode.value : undefined,
      split: isSplitEnabled,
    },
    {
      order: { column: 'updated_at', options: { ascending: false } },
    },
    { keepPreviousData: true },
  );

  const handleChangeActivity = (selected: Option<Activity | null, Entity>) => {
    setSelectedActivity(selected);
    setSessionStorageValue(SessionStorageKey.GroupsActivityFilter, selected);
  };

  const handleChangeExperience = (selected: Option<Experience | null>) => {
    setSelectedExperience(selected);
    setSessionStorageValue(SessionStorageKey.GroupsExperienceFilter, selected);
  };

  const handleChangeMode = (selected: Option<Gamemode | null>) => {
    setSelectedMode(selected);
    setSessionStorageValue(SessionStorageKey.GroupsModeFilter, selected);
  };

  const handleToggleSplit = () => {
    setIsSplitEnabled(!isSplitEnabled);
    setSessionStorageValue(
      SessionStorageKey.GroupsSplitEnabled,
      !isSplitEnabled,
    );
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isFiltering =
    !!debouncedValue ||
    !!selectedActivity?.value ||
    !!selectedExperience?.value ||
    !!selectedMode?.value ||
    isSplitEnabled;

  return (
    <div className="container px-4 pt-4">
      <div className="mb-3 flex justify-between">
        <input
          value={term}
          className="input w-full bg-black-pearl-900 xs:w-auto"
          placeholder="Search groups..."
          onChange={handleSearch}
        />
        <CreateGroup />
      </div>
      <div className="mb-6 flex flex-col items-end justify-between gap-6 xs:flex-row xs:gap-3">
        <div className="flex flex-wrap gap-3">
          <ActivitySelect
            value={selectedActivity}
            onChange={handleChangeActivity}
            className="w-full xs:w-auto"
            tint="light"
            isFilter
          />
          <ExperienceSelect
            value={selectedExperience}
            onChange={handleChangeExperience}
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
        <div className="flex justify-end gap-2">
          <label
            htmlFor="split"
            className="block whitespace-nowrap text-sm leading-6"
          >
            Split
          </label>
          <input
            checked={isSplitEnabled}
            type="checkbox"
            className="toggle toggle-primary text-black-pearl-100"
            onChange={handleToggleSplit}
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-5">
          {[...Array(10)].map((_, index) => (
            <GroupCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !!groups?.pages[0]?.length && (
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
      )}

      {!isLoading && !groups?.pages[0]?.length && isFiltering && (
        <p className="mx-auto max-w-xs text-center text-lg text-black-pearl-200/40 xs:max-w-none">
          No groups found, try filtering on something else.
        </p>
      )}

      {!isLoading && !groups?.pages[0]?.length && !isFiltering && (
        <p className="mx-auto max-w-xs text-center text-lg text-black-pearl-200/40 xs:max-w-none">
          There are no groups open at the moment.
        </p>
      )}
    </div>
  );
};

export default Groups;
