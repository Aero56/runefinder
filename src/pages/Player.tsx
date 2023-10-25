import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import usePlayerQuery from '@hooks/queries/usePlayerQuery';

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
    <div className="container grid grid-cols-1 gap-4 pt-4 sm:grid-cols-5">
      <div className="col-span-1 rounded-xl bg-black-pearl-900 p-4 sm:col-span-2">
        <p className="text-center text-xl font-bold">{username}</p>
        <div className="divider my-1" />
        <p className="text-xs font-bold">ABOUT ME</p>
        <p className="text-xs font-bold">
          {'Member since: '}
          <span className="font-normal">
            {format(new Date(player.created_at), 'd MMM yyyy')}
          </span>
        </p>
      </div>
      <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-3">
        <div className="rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
          Stats
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            {player?.stats &&
              Object.entries(player.stats.skills).map(([key, value]) => (
                <p key={key}>
                  {key}: {value.level}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
