import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import usePlayerQuery from '@hooks/queries/usePlayerQuery';
import Stats from '@components/Stats';

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
        <p className="text-xs font-bold">
          {'Member since: '}
          <span className="font-normal">
            {format(new Date(player.created_at), 'd MMM yyyy')}
          </span>
        </p>
      </div>
      {player.stats && <Stats stats={player.stats} />}
    </div>
  );
};

export default Player;
