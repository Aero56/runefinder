import { Bosses } from 'types/bosses';
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

const calculateScore = (rank: number, multiplier = 1) => {
  const baseScore = 100;
  const rankScaling = 50000;

  if (rank === -1) {
    return 0;
  }

  return baseScore * Math.exp(-(rank / rankScaling)) * multiplier;
};

export const getRaidScore = (bosses: Bosses) => {
  let score = 0;

  score += calculateScore(bosses.chambersOfXeric.rank, 1.5);
  score += calculateScore(bosses.chambersOfXericChallengeMode.rank, 3);

  score += calculateScore(bosses.tombsOfAmascut.rank);
  score += calculateScore(bosses.tombsOfAmascutExpertMode.rank, 2.5);

  score += calculateScore(bosses.theatreOfBlood.rank, 3);
  score += calculateScore(bosses.theatreOfBloodHardMode.rank, 5);

  return Math.round(score);
};
