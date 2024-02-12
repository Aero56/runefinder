import { useQuery } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { useAuth } from 'contexts/AuthContext';
import { Player } from 'types/player';

const usePlayerQuery = (id?: string) => {
  const { user } = useAuth();

  const userId = id ?? user?.id;

  const queryKey = ['player', userId];

  return useQuery<Player | null>(queryKey, async () => {
    if (!userId) {
      return null;
    }

    const { data } = await supabase
      .from('users')
      .select(
        '*, stats:statistics!statistics_id_fkey(*), group:groups!users_group_id_fkey(*)',
      )
      .eq('id', userId)
      .single<Player>();

    return data;
  });
};

export default usePlayerQuery;
