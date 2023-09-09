import { Group } from '@/types/group';
import { QueryParams } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useGroupsQuery = (
  params?: QueryParams,
  options?: UseQueryOptions<Group[]>
) => {
  const queryKey = ['groups'];

  return useQuery<Group[]>(
    queryKey,
    async () => {
      let query = supabase
        .from('groups')
        .select('*, users!users_group_id_fkey(id, username)');

      if (params?.order) {
        query = query.order(params.order.column, params.order.options);
      }

      const { data } = await query;

      return data ?? [];
    },
    options
  );
};

export default useGroupsQuery;
