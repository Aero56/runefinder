import { useMutation } from '@tanstack/react-query';

import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';

interface PlayerVoteMutationProps {
  playerId: string;
  vote: number;
}

const usePlayerVoteMutation = () => {
  const { user } = useAuth();

  return useMutation(async ({ playerId, vote }: PlayerVoteMutationProps) => {
    if (!user) {
      throw new Error('You must be logged in to do this.');
    }

    const { data, error } = await supabase
      .from('player_votes')
      .upsert({ user_id: user.id, player_id: playerId, vote });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export default usePlayerVoteMutation;
