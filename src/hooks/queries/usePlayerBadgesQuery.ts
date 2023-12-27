import { useQuery } from '@tanstack/react-query';

import { supabase } from 'api/supabase';
import { Badge } from 'types/badges';

const usePlayerBadgesQuery = (playerId: string) => {
  const queryKey = ['playerBadges', playerId];

  return useQuery<Badge[] | null>(queryKey, async () => {
    const { data } = await supabase
      .from('user_badges')
      .select('...badges!inner(*)')
      .eq('user_id', playerId)
      .returns<Badge[]>();

    return data;
  });
};

export default usePlayerBadgesQuery;
