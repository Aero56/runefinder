import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import usePlayerQuery from '@hooks/queries/usePlayerQuery';
import Stats from '@components/Stats';
import PlayerVote from '@components/PlayerVote';

const Player = () => {
  const { username = '' } = useParams();

  const { data: player, isLoading } = usePlayerQuery(username);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!player) {
    return <p>This player does not exist on runefinder.</p>;
  }

  return (
    <div className="container pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="col-span-1 rounded-xl bg-black-pearl-900 p-4 sm:col-span-2">
          <div className="align flex items-center justify-between">
            <p className="text-xl font-bold">{username}</p>
            <PlayerVote playerId={player.id} />
          </div>
          <div className="divider my-1" />
          <p className="text-xs font-bold">
            {'Member since: '}
            <span className="font-normal">
              {format(new Date(player.created_at), 'd MMM yyyy')}
            </span>
          </p>
        </div>
        {player.stats && <Stats stats={player.stats} />}
      </div>
    </div>
  );
};

export default Player;
