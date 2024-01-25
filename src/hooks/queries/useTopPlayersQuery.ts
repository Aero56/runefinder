import { useQuery } from '@tanstack/react-query';

import { supabase } from 'api/supabase';

const useTopPlayersQuery = () => {
  const queryKey = ['topPlayers'];

  return useQuery(queryKey, async () => {
    const { data } = await supabase.from('top_players').select('*');

    return data;
  });
};

export default useTopPlayersQuery;
