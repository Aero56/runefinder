import { useParams } from 'react-router-dom';
import { supabase } from '@api/supabase';
import { useCallback, useEffect, useState } from 'react';

import { Stats } from '@/types/stats';

const Player = () => {
  const { username = '' } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const getStats = useCallback(async () => {
    const { data } = await supabase
      .from('users')
      .select('username, stats')
      .eq('username', username)
      .single();

    setStats(data?.stats ?? null);
  }, [username]);

  useEffect(() => {
    getStats().then(() => setLoaded(true));
  }, [getStats]);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  if (!stats) {
    return <p>This player does not exist on runefinder.</p>;
  }

  return (
    <div className="flex flex-col">
      {username}
      {Object.entries(stats.skills).map(([key, value]) => (
        <p key={key}>
          {key}: {value.level}
        </p>
      ))}
    </div>
  );
};

export default Player;
