import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

const useUserQuery = () => {
  const { user } = useAuth();

  const queryKey = ['user', user?.id];

  return useQuery<Table<'users'> | null>(queryKey, async () => {
    if (!user) {
      return null;
    }

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user!.id)
      .single();

    return data;
  });
};

export default useUserQuery;
