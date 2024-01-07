import { Skills } from 'types/skills';
import { Tables } from 'types/supabase';

interface StatsProps {
  stats?: Tables<'statistics'>;
  isLoading: boolean;
}

const SKILLS: Array<keyof Skills> = [
  'attack',
  'hitpoints',
  'mining',
  'strength',
  'agility',
  'smithing',
  'defence',
  'herblore',
  'fishing',
  'ranged',
  'thieving',
  'cooking',
  'prayer',
  'crafting',
  'firemaking',
  'magic',
  'fletching',
  'woodcutting',
  'runecraft',
  'slayer',
  'farming',
  'construction',
  'hunter',
];

const Stats = ({ stats, isLoading }: StatsProps) => {
  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-3">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Stats
        {stats && (
          <div className="badge badge-primary">
            {`Total: ${stats.skills.overall.level}`}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-96 py-4 sm:p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {stats && !isLoading
              ? SKILLS.map((skillName) => {
                  const skill = stats.skills[skillName];

                  return (
                    <div
                      key={skillName}
                      className="flex w-1/4 rounded-xl border-2 border-black-pearl-700 bg-black-pearl-800 p-1"
                    >
                      <img
                        src={
                          new URL(
                            `../assets/skills/${skillName}.png`,
                            import.meta.url,
                          ).href
                        }
                        alt={`Skill icon of ${skillName}`}
                        className="ml-1 h-6 w-6 object-contain"
                      />
                      <p
                        className={`mx-auto ${
                          !skill.rank ? 'text-black-pearl-100/30' : ''
                        }`}
                      >
                        {skill.level}
                      </p>
                    </div>
                  );
                })
              : [...Array(SKILLS.length)].map(() => (
                  <div className="skeleton h-9 w-24 rounded-xl bg-black-pearl-950/60" />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
