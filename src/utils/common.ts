import { Skills } from 'types/skills';

export const getCombatLevel = ({
  prayer,
  hitpoints,
  defence,
  attack,
  strength,
  ranged,
  magic,
}: Skills) => {
  const baseLevel =
    (Math.floor(prayer.level / 2) + hitpoints.level + defence.level) / 4;

  const meleeLevel = (attack.level + strength.level) * 0.325;
  const rangeLevel = (Math.floor(ranged.level / 2) + ranged.level) * 0.325;
  const mageLevel = (Math.floor(magic.level / 2) + magic.level) * 0.325;

  return Math.floor(baseLevel + Math.max(meleeLevel, rangeLevel, mageLevel));
};
