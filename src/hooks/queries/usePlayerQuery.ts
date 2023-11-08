import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const usePlayerQuery = (
  id: string,
  options?: UseQueryOptions<Table<'users'> | null>,
) => {
  const queryKey = ['player', id];

  return useQuery<Table<'users'> | null>(
    queryKey,
    async () => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      return data;
    },
    options,
  );
};

export default usePlayerQuery;
