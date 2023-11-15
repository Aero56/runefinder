import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import useUserQuery from '@hooks/queries/useUserQuery';
import Stats from '@components/Stats';
import PlayerVote from '@components/PlayerVote';
import Description from '@components/Description';
import { useAuth } from '@contexts/AuthContext';
import Comments from '@components/Comments';

const Player = () => {
  const { user } = useAuth();

  const { id = '' } = useParams();

  const { data: player, isLoading } = useUserQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!player?.username) {
    return <p>This player does not exist on RuneFinder.</p>;
  }

  const isPlayerMe = player.id === user?.id;

  return (
    <div className="container mb-12 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="col-span-1 rounded-xl bg-black-pearl-900 p-4 sm:col-span-2">
          <div className="align mb-2 flex items-center justify-between">
            <p className="text-xl font-bold text-anzac-400">
              {player.username}
            </p>
            <PlayerVote playerId={player.id} />
          </div>
          {isPlayerMe ? (
            <Description value={player.description} />
          ) : (
            player.description && (
              <p className="text-sm">{player.description}</p>
            )
          )}
          <div className="divider my-1" />
          <p className="mt-2 text-xs font-bold">
            {'Member since: '}
            <span className="font-normal">
              {format(new Date(player.created_at), 'd MMM yyyy')}
            </span>
          </p>
        </div>
        {player.stats && <Stats stats={player.stats} />}
        <Comments userId={player.id} />
      </div>
    </div>
  );
};

export default Player;
