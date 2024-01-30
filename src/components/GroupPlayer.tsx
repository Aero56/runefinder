import { XMarkIcon } from '@heroicons/react/24/outline';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import queryClient from 'api/queryClient';
import { supabase } from 'api/supabase';
import { useAuth } from 'contexts/AuthContext';
import useKickPlayerMutation from 'hooks/mutations/useKickPlayerMutation';
import { Bosses } from 'types/bosses';
import { Group, GroupUser } from 'types/groups';

interface GroupPlayerProps {
  group: Group;
  player: GroupUser;
  isHost?: boolean;
}

const GroupPlayer = ({ group, player, isHost }: GroupPlayerProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutateAsync, isLoading } = useKickPlayerMutation();

  const handleKickPlayer = async (event: MouseEvent) => {
    event.stopPropagation();

    try {
      await mutateAsync({ userId: player.id, groupId: group.id }).then(() => {
        toast(`You have kicked ${player.username} from the group!`);

        const channel = supabase.channel(group.id);
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            channel.send({
              type: 'broadcast',
              event: 'kick',
              payload: {
                player,
              },
            });
          }
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    queryClient.invalidateQueries(['group', group.id]);
  };

  const activityStats =
    player.stats?.bosses[group.activity.value as keyof Bosses];

  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4 transition-colors hover:bg-black-pearl-950/30"
      onClick={() => navigate(`/player/${player.id}`)}
    >
      <div className="flex">
        <div className="flex w-16 flex-col items-center justify-center">
          <p className="text-lg font-bold text-anzac-400 xs:text-xl">
            {player.stats?.raid_score}
          </p>
        </div>
        <div className="divider divider-horizontal ml-0 mr-1"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {isHost && (
              <div className="badge badge-primary badge-sm font-semibold xs:badge-md">
                Host
              </div>
            )}
            <div className="flex items-center gap-1">
              {player.stats?.gamemode && (
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
              <p className="text-lg font-semibold xs:text-xl">
                {player.username}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {!activityStats?.score && !activityStats?.rank && (
              <div className="badge badge-sm bg-black-pearl-800 xs:badge-md">
                Unranked
              </div>
            )}
            {activityStats?.score && (
              <div className="badge badge-sm bg-black-pearl-800 xs:badge-md">
                {activityStats.score} kills
              </div>
            )}
            {activityStats?.rank && (
              <div className="badge  badge-sm bg-black-pearl-800 xs:badge-md">
                #{activityStats.rank}
              </div>
            )}
            <div className="badge  badge-sm bg-black-pearl-800 xs:badge-md">
              Combat level {player.stats?.combat}
            </div>
          </div>
        </div>
      </div>
      {!isHost &&
        group.created_by.id === user?.id &&
        group.status !== 'closed' && (
          <button
            className="btn btn-xs w-6 rounded-full border-red-500 bg-red-500/20 px-0 text-red-500 xs:btn-sm hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50 xs:w-auto xs:rounded-lg xs:px-2"
            onClick={handleKickPlayer}
          >
            {!isLoading ? (
              <>
                <XMarkIcon className="block h-4 w-4 xs:hidden [&>path]:stroke-[2.5]" />
                <p className="hidden xs:block">Kick</p>
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        )}
    </div>
  );
};

export default GroupPlayer;
