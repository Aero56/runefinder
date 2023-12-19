import { MouseEvent } from 'react';
import toast from 'react-hot-toast/headless';
import { useNavigate } from 'react-router-dom';

import { getCombatLevel, getRaidScore } from '../utils/common';

import queryClient from 'api/queryClient';
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
      await mutateAsync({ userId: player.id, groupId: group.id }).then(() =>
        toast(`Player ${player.username} has been kicked.`),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
        return;
      }
    }

    queryClient.invalidateQueries(['group', group.id]);
  };

  const activityStats = player.stats.bosses[group.type.value as keyof Bosses];

  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4 transition-colors hover:bg-black-pearl-950/30"
      onClick={() => navigate(`/player/${player.id}`)}
    >
      <div className="flex">
        <div className="flex w-16 flex-col items-center justify-center">
          <p className="text-xl font-bold text-anzac-400">
            {getRaidScore(player.stats!.bosses)}
          </p>
        </div>
        <div className="divider divider-horizontal mx-0"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {isHost && (
              <div className="badge badge-primary font-semibold">Host</div>
            )}
            <p className="text-xl font-semibold">{player.username}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {activityStats.score === -1 && activityStats.rank === -1 && (
              <div className="badge bg-black-pearl-800">Unranked</div>
            )}
            {activityStats.score !== -1 && (
              <div className="badge bg-black-pearl-800">
                {activityStats.score === -1 ? 0 : activityStats.score} kills
              </div>
            )}
            {activityStats.rank !== -1 && (
              <div className="badge bg-black-pearl-800">
                #{activityStats.rank}
              </div>
            )}
            <div className="badge bg-black-pearl-800">
              Combat level {getCombatLevel(player.stats!.skills)}
            </div>
          </div>
        </div>
      </div>
      {!isHost && group.created_by.id === user?.id && (
        <button
          className="btn btn-sm border-red-500 bg-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-black-pearl-50"
          onClick={handleKickPlayer}
        >
          {!isLoading ? (
            'Kick'
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      )}
    </div>
  );
};

export default GroupPlayer;
