import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Experience } from 'components/ExperienceSelect';
import { Gamemode } from 'components/ModeSelect';
import { Group } from 'types/groups';
import { QueryModifiers } from 'types/supabase';

export const RECORD_LIMIT = 20;

interface Filters {
  name?: string;
  type?: number;
  level?: Experience;
  gamemode?: Gamemode;
}

const useGroupsQuery = (
  filters?: Filters,
  modifiers?: QueryModifiers,
  options?: UseInfiniteQueryOptions<Group[] | null>,
) => {
  const queryKey = ['groups', filters];

  return useInfiniteQuery<Group[] | null>(
    queryKey,
    async ({ pageParam = 1 }) => {
      const offset = RECORD_LIMIT * pageParam;

      let query = supabase
        .from('groups')
        .select(
          '*, users!users_group_id_fkey(id, username), type!inner(id, name, value), created_by!inner(id, username)',
        )
        .eq('status', 'open')
        .range(offset - RECORD_LIMIT, offset - 1);

      if (filters?.name) {
        query = query.ilike('name', `%${filters.name}%`);
      }

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.level) {
        query = query.eq('level', filters.level);
      }

      if (filters?.gamemode) {
        query = query.eq('gamemode', filters.gamemode);
      }

      if (modifiers?.order) {
        query = query.order(modifiers.order.column, modifiers.order.options);
      }

      const { data } = await query.returns<Group[]>();

      return data;
    },
    {
      ...options,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.length === RECORD_LIMIT
          ? Math.ceil(lastPage.length / RECORD_LIMIT) + pages.length
          : undefined,
    },
  );
};

export default useGroupsQuery;
