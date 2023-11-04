import { Skills } from '@/types/skills';
import { Stats as StatsType } from '@/types/stats';

interface StatsProps {
  stats: StatsType;
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
  'runecrafting',
  'slayer',
  'farming',
  'construction',
  'hunter',
];

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-3">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Stats
        <div className="badge badge-primary">
          {`Total: ${stats.skills.overall.level}`}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-96 py-4 sm:p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <div
                key={skill}
                className="flex w-1/4 rounded-xl border-2 border-black-pearl-700 bg-black-pearl-800 p-1"
              >
                <img
                  src={`src/assets/skills/${skill}.png`}
                  alt={`Skill icon of ${skill}`}
                  className="ml-1 h-6 w-6 object-contain"
                />
                <p className="mx-auto">{stats.skills[skill]?.level ?? 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
