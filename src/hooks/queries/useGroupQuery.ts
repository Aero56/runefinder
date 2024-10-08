import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Group } from 'types/groups';

const useGroupQuery = (id: string, options?: UseQueryOptions<Group | null>) => {
  const queryKey = ['group', id];

  return useQuery<Group | null>(
    queryKey,
    async () => {
      const { data } = await supabase
        .from('groups')
        .select(
          '*, users!users_group_id_fkey(id, username, stats:user_details(*)), activity:type(id, name, value, type), created_by(id, username, stats:user_details(*))',
        )
        .eq('id', id)
        .single<Group>();

      return data;
    },
    options,
  );
};

export default useGroupQuery;
