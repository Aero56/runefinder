import { Group } from '@/types/groups';
import { supabase } from '@api/supabase';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useGroupQuery = (id: string, options?: UseQueryOptions<Group | null>) => {
  const queryKey = ['group', id];

  return useQuery<Group | null>(
    queryKey,
    async () => {
      const { data } = await supabase
        .from('groups')
        .select('*, users!users_group_id_fkey(id, username)')
        .eq('id', id)
        .single<Group>();

      return data;
    },
    options,
  );
};

export default useGroupQuery;
