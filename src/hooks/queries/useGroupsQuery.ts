import { Group } from '@/types/groups';
import { QueryModifiers } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface Filters {
  type?: number;
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

      if (filters?.type) {
        query = query.eq('type', filters.type);
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
