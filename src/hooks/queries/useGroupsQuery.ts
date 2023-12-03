import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Group } from '@/types/groups';
import { QueryModifiers } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { Experience } from '@components/ExperienceSelect';
import { Mode } from '@components/ModeSelect';

interface Filters {
  name?: string;
  type?: number;
  level?: Experience;
  mode?: Mode;
}

const useGroupsQuery = (
  filters?: Filters,
  modifiers?: QueryModifiers,
  options?: UseQueryOptions<Group[] | null>,
) => {
  const queryKey = ['groups', filters];

  return useQuery<Group[] | null>(
    queryKey,
    async () => {
      let query = supabase
        .from('groups')
        .select(
          '*, users!users_group_id_fkey(id, username), type!inner(id, name)',
        )
        .eq('status', 'open');

      if (filters?.name) {
        console.log(filters.name);

        query = query.ilike('name', `%${filters.name}%`);
      }

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.level) {
        query = query.eq('level', filters.level);
      }

      if (filters?.mode) {
        query = query.eq('mode', filters.mode);
      }

      if (modifiers?.order) {
        query = query.order(modifiers.order.column, modifiers.order.options);
      }

      const { data } = await query.returns<Group[]>();

      return data;
    },
    options,
  );
};

export default useGroupsQuery;
