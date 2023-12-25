import { useMemo } from 'react';

import { Tables } from 'types/supabase';

interface PlayerBadgesProps {
  stats: Tables<'statistics'>;
}

interface Badge {
  imageName: string;
  label: string;
}

const PlayerBadges = ({ stats }: PlayerBadgesProps) => {
  const badges = useMemo(() => {
    const badges: Badge[] = [];

    if (stats.bosses.tzKalZuk.score !== -1) {
      badges.push({
        imageName: 'InfernalCape',
        label: 'Owns an infernal cape',
      });
    }

    return badges;
  }, [stats]);

  if (!badges.length) {
    return null;
  }

  return (
    <div className="mx-auto mt-2 grid max-w-xs grid-cols-5 justify-between gap-4 rounded-xl bg-black-pearl-950 p-3 sm:grid-cols-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="mx-auto rounded-lg border-2 border-black-pearl-800 bg-black-pearl-900 p-1"
          title={badge.label}
        >
          <img
            src={
              new URL(
                `../assets/badges/${badge.imageName}.png`,
                import.meta.url,
              ).href
            }
          ></img>
        </div>
      ))}
    </div>
  );
};

export default PlayerBadges;
