export enum SessionStorageKey {
  GroupsSearchTerm = 'groupsSearchTerm',
  GroupsActivityFilter = 'groupsActivityFilter',
  GroupsExperienceFilter = 'groupsExperienceFilter',
  GroupsModeFilter = 'groupsModeFilter',
  GroupsSplitEnabled = 'groupsSplitEnabled',
}

export const getSessionStorageValue = (key: SessionStorageKey) => {
  const value = sessionStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
};

export const setSessionStorageValue = <T>(key: SessionStorageKey, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
