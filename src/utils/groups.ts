import { Group } from 'types/groups';
import { Player } from 'types/player';

export const canJoinGroup = (group: Group, player: Player) => {
  if (group.users.length === group.size) {
    return false;
  }

  if (group.gamemode === 'ironman' && !player.stats.gamemode) {
    return false;
  }

  if (group.gamemode === 'hardcore' && player.stats.gamemode !== 'hardcore') {
    return false;
  }

  if (group.gamemode === 'ultimate' && player.stats.gamemode !== 'ultimate') {
    return false;
  }

  return true;
};
