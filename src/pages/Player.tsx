import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import Comments from 'components/Comments';
import Description from 'components/Description';
import PlayerBadges from 'components/PlayerBadges';
import PlayerVote from 'components/PlayerVote';
import Rankings from 'components/Rankings';
import Stats from 'components/Stats';
import { useAuth } from 'contexts/AuthContext';
import usePlayerQuery from 'hooks/queries/usePlayerQuery';

const Player = () => {
  const { user } = useAuth();
  const { id = '' } = useParams();
  const { data: player, isLoading } = usePlayerQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!player?.stats) {
    return (
      <div className="flex h-[calc(100vh-128px)] items-center justify-center sm:h-[calc(100vh-64px)]">
        <div className="flex flex-col gap-3 p-4 text-center">
          <h1 className="text-4xl font-bold text-anzac-400 sm:text-6xl">
            Oops!
          </h1>
          <p className="text-xl sm:text-2xl">
            This player does not exist on RuneFinder.
          </p>
        </div>
      </div>
    );
  }

  const isPlayerMe = player.id === user?.id;

  return (
    <div className="container mb-4 px-4 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="col-span-1 rounded-xl bg-black-pearl-900 p-4 sm:col-span-2">
          <div className="align mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {player.stats.gamemode && (
                <img
                  src={
                    new URL(
                      `../assets/modes/${player.stats.gamemode}.png`,
                      import.meta.url,
                    ).href
                  }
                  alt={`${player.stats.gamemode} icon`}
                  className="h-4 w-4 object-contain"
                />
              )}
              <p className="text-xl font-bold text-anzac-400">
                {player.username}
              </p>
            </div>
            {player.stats && (
              <div className="badge badge-primary font-semibold">
                {player.stats.combat}
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
          {player.stats && <PlayerBadges stats={player.stats} />}
          <div className="divider my-1" />
          <p className="mt-2 text-xs font-bold">
            {'Member since: '}
            <span className="font-normal">
              {format(new Date(player.created_at), 'd MMM yyyy')}
            </span>
          </p>
        </div>
        {player.stats && (
          <>
            <Stats stats={player.stats} />
            <Rankings stats={player.stats} />
          </>
        )}
        <Comments userId={player.id} />
      </div>
    </div>
  );
};

export default Player;
