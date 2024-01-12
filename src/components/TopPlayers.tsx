import { Link } from 'react-router-dom';

import useTopPlayersQuery from 'hooks/queries/useTopPlayersQuery';

const TopPlayers = () => {
  const { data, isLoading } = useTopPlayersQuery();

  return (
    <div className="h-min w-full rounded-xl bg-black-pearl-900 lg:w-1/3">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Top players
      </div>
      <div className="flex flex-col gap-2 p-4">
        {!isLoading
          ? data?.map((player, index) => {
              const rank = index + 1;

              return (
                <Link
                  to={`/player/${player.id}`}
                  className="flex items-center justify-between gap-2 rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4 transition-colors hover:bg-black-pearl-950/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded bg-anzac-400 text-center text-sm font-semibold text-black-pearl-950 ${
                        rank === 1
                          ? 'bg-anzac-400'
                          : rank === 2
                            ? 'bg-black-pearl-100'
                            : rank === 3
                              ? 'bg-amber-600'
                              : 'bg-black-pearl-600'
                      }`}
                    >
                      {rank}
                    </div>
                    <p className="font-medium">{player.user?.username}</p>
                  </div>
                  <p className="font-semibold text-anzac-400">
                    {player.raid_score}
                  </p>
                </Link>
              );
            })
          : [...Array(3)].map(() => (
              <div className="skeleton h-[60px] w-full rounded-xl bg-black-pearl-950/60" />
            ))}
      </div>
    </div>
  );
};

export default TopPlayers;
