import { useState } from 'react';

import Select, { Option, Tint } from './Select';

import { ActivityType, Other } from 'types/activities';
import { Boss } from 'types/bosses';
import { Minigame } from 'types/minigames';
import { Raid } from 'types/raids';

export type Activity = Raid | Boss | Minigame | Other;

export interface Entity {
  teamSize: number;
  type: ActivityType | null;
}

export const ACTIVITIES = [
  { label: 'Any activity', value: null },
  {
    label: 'Raids',
    options: [
      {
        label: 'Theatre of Blood',
        value: Raid.TheatreOfBlood,
        entity: { teamSize: 5, type: ActivityType.Raid },
      },
      {
        label: 'Chambers of Xeric',
        value: Raid.ChambersOfXeric,
        entity: { teamSize: 100, type: ActivityType.Raid },
      },
      {
        label: 'Tombs of Amascut',
        value: Raid.TombsOfAmascut,
        entity: { teamSize: 8, type: ActivityType.Raid },
      },
      {
        label: 'Theatre of Blood (Hard Mode)',
        value: Raid.TheatreOfBloodHardMode,
        entity: { teamSize: 5, type: ActivityType.Raid },
      },
      {
        label: 'Chambers of Xeric (Challenge Mode)',
        value: Raid.ChambersOfXericChallengeMode,
        entity: { teamSize: 100, type: ActivityType.Raid },
      },
      {
        label: 'Tombs of Amascut (Expert Mode)',
        value: Raid.TombsOfAmascutExpertMode,
        entity: { teamSize: 8, type: ActivityType.Raid },
      },
    ],
  },
  {
    label: 'Bosses',
    options: [
      {
        label: 'Nex',
        value: Boss.Nex,
        entity: { teamSize: 60, type: ActivityType.Boss },
      },
      {
        label: "Kree'arra",
        value: Boss.KreeArra,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: 'General Graardor',
        value: Boss.GeneralGraardor,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: 'Commander Zilyana',
        value: Boss.CommanderZilyana,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: "K'ril Tsutsaroth",
        value: Boss.KrilTsutsaroth,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: 'The Nightmare',
        value: Boss.Nightmare,
        entity: { teamSize: 80, type: ActivityType.Boss },
      },
      {
        label: 'Corporeal Beast',
        value: Boss.CorporealBeast,
        entity: { teamSize: 100, type: ActivityType.Boss },
      },
      {
        label: 'King Black Dragon',
        value: Boss.KingBlackDragon,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: 'Zalcano',
        value: Boss.Zalcano,
        entity: { teamSize: 6, type: ActivityType.Boss },
      },
      {
        label: 'Wintertodt',
        value: Boss.Wintertodt,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
      {
        label: 'Tempoross',
        value: Boss.Tempoross,
        entity: { teamSize: 10, type: ActivityType.Boss },
      },
    ],
  },
  {
    label: 'Minigames',
    options: [
      {
        label: 'Barbarian Assault',
        value: Minigame.BarbarianAssault,
        entity: { teamSize: 5, type: ActivityType.Minigame },
      },
      {
        label: 'Castle Wars',
        value: Minigame.CastleWars,
        entity: { teamSize: 100, type: ActivityType.Minigame },
      },
      {
        label: 'Pest Control',
        value: Minigame.PestControl,
        entity: { teamSize: 25, type: ActivityType.Minigame },
      },
      {
        label: 'Trouble Brewing',
        value: Minigame.TroubleBrewing,
        entity: { teamSize: 100, type: ActivityType.Minigame },
      },
      {
        label: 'Fight Pit',
        value: Minigame.FightPit,
        entity: { teamSize: 100, type: ActivityType.Minigame },
      },
      {
        label: 'Gnome Ball',
        value: Minigame.GnomeBall,
        entity: { teamSize: 100, type: ActivityType.Minigame },
      },
    ],
  },
  {
    label: 'Other',
    options: [
      {
        label: 'Shield of Arrav',
        value: Other.ShieldOfArrav,
        entity: { teamSize: 2, type: null },
      },
      {
        label: "Heroes' Quest",
        value: Other.HeroesQuest,
        entity: { teamSize: 2, type: null },
      },
    ],
  },
];

interface ActivitySelectProps {
  value: Option<Activity | null, Entity> | null;
  onChange: (value: Option<Activity | null, Entity>) => void;
  className?: string;
  tint?: Tint;
  isFilter?: boolean;
}

const ActivitySelect = ({
  value,
  onChange,
  className,
  tint,
  isFilter,
}: ActivitySelectProps) => {
  const [selected, setSelected] = useState<Option<Activity | null, Entity>>(
    value !== null ? value : ACTIVITIES[0],
  );

  const handleChange = (value: Option<Activity | null, Entity>[]) => {
    onChange(value[0]);
    setSelected(value[0]);
  };

  return (
    <Select
      value={selected ? [selected] : []}
      onChange={handleChange}
      options={
        isFilter
          ? ACTIVITIES
          : ACTIVITIES.filter((activity) => activity !== ACTIVITIES[0])
      }
      placeholder="Choose activity"
      className={className}
      tint={tint}
    />
  );
};

export default ActivitySelect;
