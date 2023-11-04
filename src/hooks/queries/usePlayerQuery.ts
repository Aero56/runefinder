import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const usePlayerQuery = (
  username: string,
  options?: UseQueryOptions<Table<'users'> | null>,
) => {
  const queryKey = ['player', username];

  return useQuery<Table<'users'> | null>(
    queryKey,
    async () => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      return data;
    },
    options,
  );
};

export default usePlayerQuery;
