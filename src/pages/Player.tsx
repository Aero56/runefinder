import { useParams } from 'react-router-dom';

import usePlayerQuery from '@hooks/usePlayerQuery';

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
    <div className="flex flex-col">
      {username}
      {Object.entries(player.stats.skills).map(([key, value]) => (
        <p key={key}>
          {key}: {value.level}
        </p>
      ))}
    </div>
  );
};

export default Player;
