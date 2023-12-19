import { getCombatLevel, getRaidScore } from '../utils/common';

import { Bosses } from 'types/bosses';
import { Group, GroupUser } from 'types/groups';

interface GroupPlayerProps {
  group: Group;
  player: GroupUser;
  isHost?: boolean;
}

const GroupPlayer = ({ group, player, isHost }: GroupPlayerProps) => {
  const activityStats = player.stats.bosses[group.type.value as keyof Bosses];

  return (
    <div className="flex gap-2 rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4">
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
          {activityStats.score && (
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
  );
};

export default GroupPlayer;
