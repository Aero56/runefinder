import { supabase } from '@api/supabase';
import { useQuery } from '@tanstack/react-query';

const usePlayerTotalVotesQuery = (playerId: string) => {
  const queryKey = ['playerTotalVotes', playerId];

  return useQuery(queryKey, async () => {
    const { data } = await supabase.rpc('get_player_votes', {
      var_player_id: playerId,
    });

    return data ?? 0;
  });
};

export default usePlayerTotalVotesQuery;
