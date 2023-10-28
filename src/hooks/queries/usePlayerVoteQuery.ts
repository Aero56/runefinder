import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

const usePlayerVoteQuery = (playerId: string) => {
  const { user } = useAuth();

  const queryKey = ['playerVote', playerId, user?.id];

  return useQuery(queryKey, async () => {
    if (!user) {
      return null;
    }

    const { data } = await supabase
      .from('player_votes')
      .select('vote')
      .eq('user_id', user.id)
      .eq('player_id', playerId)
      .single();

    return data?.vote ?? null;
  });
};

export default usePlayerVoteQuery;
