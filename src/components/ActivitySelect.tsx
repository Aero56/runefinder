import { useState } from 'react';

import Select, { Option, Tint } from './Select';

import { Raid } from 'types/raids';

export const ACTIVITIES = [
  { label: 'Any activity', value: null },
  {
    label: 'Raids',
    options: [
      {
        label: 'Theatre of Blood',
        value: Raid.TheatreOfBlood,
        entity: { teamSize: 5 },
      },
      {
        label: 'Chambers of Xeric',
        value: Raid.ChambersOfXeric,
        entity: { teamSize: 100 },
      },
      {
        label: 'Tombs of Amascut',
        value: Raid.TombsOfAmascut,
        entity: { teamSize: 8 },
      },
    ],
  },
  { label: 'Test', options: [{ label: 'Test', value: 0 }] },
];

interface ActivitySelectProps {
  value: Option<Raid | null> | null;
  onChange: (value: Option<Raid | null>) => void;
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
  const [selected, setSelected] = useState<Option<Raid | null>>(
    value !== null ? value : ACTIVITIES[0],
  );

  const handleChange = (value: Option<Raid | null>[]) => {
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
