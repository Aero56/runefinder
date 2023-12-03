import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';

const useUserQuery = (
  id?: string,
  options?: UseQueryOptions<Table<'users'> | null>,
) => {
  const { user } = useAuth();

  const userId = id ?? user?.id;

  const queryKey = ['user', userId];

  return useQuery<Table<'users'> | null>(
    queryKey,
    async () => {
      if (!userId) {
        return null;
      }

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      return data;
    },
    options,
  );
};

export default useUserQuery;
