import { useMemo } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

import usePlayerBadgesQuery from 'hooks/queries/usePlayerBadgesQuery';
import { BadgeType } from 'types/badges';
import { Tables } from 'types/supabase';

interface PlayerBadgesProps {
  stats: Tables<'user_details'>;
}

interface Badge {
  label: string;
  type: BadgeType;
}

const BADGES: Record<BadgeType, Badge> = {
  [BadgeType.Supporter]: {
    label: 'Supporter',
    type: BadgeType.Supporter,
  },
  [BadgeType.Inferno]: {
    label: 'Owns an infernal cape',
    type: BadgeType.Inferno,
  },
  [BadgeType.Maxed]: {
    label: 'Level 99 in all skills',
    type: BadgeType.Maxed,
  },
};

const PlayerBadges = ({ stats }: PlayerBadgesProps) => {
  const { data } = usePlayerBadgesQuery(stats.id);

  const badges = useMemo(() => {
    const badges: Badge[] = [];

    data?.forEach((badge) => {
      if (BADGES[badge.name]) {
        badges.push(BADGES[badge.name]);
      }
    });

    if (stats.bosses.tzKalZuk.score !== null) {
      badges.push(BADGES[BadgeType.Inferno]);
    }

    if (stats.skills.overall.level === 2277) {
      badges.push(BADGES[BadgeType.Maxed]);
    }

    return badges;
  }, [stats, data]);

  if (!badges.length) {
    return null;
  }

  return (
    <div className="mx-auto mt-2 grid max-w-xs auto-cols-auto grid-cols-4 gap-1 rounded-xl bg-black-pearl-950 p-3 sm:grid-cols-3 md:grid-cols-4">
      {badges.map((badge, index) => (
        <Tooltip key={index}>
          <TooltipTrigger>
            <div className="mx-auto w-14 [image-rendering:pixelated]">
              <img
                src={
                  new URL(
                    `../assets/badges/${badge.type}.webp`,
                    import.meta.url,
                  ).href
                }
              ></img>
            </div>
          </TooltipTrigger>
          <TooltipContent>{badge.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default PlayerBadges;
