import { Raid } from '@/types/raids';
import Select, { Option } from './Select';
import { useState } from 'react';

export const ACTIVITIES = [
  { label: 'Anything', value: null },
  {
    label: 'Raids',
    options: [
      {
        label: 'Theatre of Blood',
        value: Raid.TheatreOfBlood,
        entity: { teamSize: 4 },
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
  value: Option<Raid | null>;
  onChange: (value: Option<Raid | null>) => void;
  className?: string;
}

const ActivitySelect = ({
  value,
  onChange,
  className,
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
      options={ACTIVITIES}
      placeholder="Choose activity"
      className={className}
    />
  );
};

export default ActivitySelect;
