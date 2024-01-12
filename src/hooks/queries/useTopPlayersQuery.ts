import { useQuery } from '@tanstack/react-query';

import { supabase } from 'api/supabase';

const useTopPlayersQuery = () => {
  const queryKey = ['topPlayers'];

  return useQuery(queryKey, async () => {
    const { data } = await supabase
      .from('statistics')
      .select('id, raid_score, user:users(username)')
      .order('raid_score', { ascending: false })
      .limit(10);

    return data;
  });
};

export default useTopPlayersQuery;
