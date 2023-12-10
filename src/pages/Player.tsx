import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import { getCombatLevel } from '../utils/common';

import Comments from 'components/Comments';
import Description from 'components/Description';
import PlayerVote from 'components/PlayerVote';
import Stats from 'components/Stats';
import { useAuth } from 'contexts/AuthContext';
import useUserQuery from 'hooks/queries/useUserQuery';

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
    <div className="container mb-4 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="col-span-1 rounded-xl bg-black-pearl-900 p-4 sm:col-span-2">
          <div className="align mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {player.mode && (
                <img
                  src={`src/assets/modes/${player.mode}.png`}
                  alt={`${player.mode} icon`}
                  className="h-4 w-4 object-contain"
                />
              )}
              <p className="text-xl font-bold text-anzac-400">
                {player.username}
              </p>
            </div>
            {player.stats && (
              <div className="badge badge-primary font-semibold">
                {getCombatLevel(player.stats.skills)}
              </div>
            )}
          </div>
          <div className="mb-4">
            {isPlayerMe ? (
              <Description value={player.description} />
            ) : (
              player.description && (
                <p className="text-sm">{player.description}</p>
              )
            )}
          </div>
          <PlayerVote playerId={player.id} />
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
