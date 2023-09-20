import { Raid } from '@/types/raids';
import Select, { Option } from './Select';
import { useState } from 'react';

export const ACTIVITIES = [
  { label: 'Anything', value: 'anything' },
  {
    label: 'Raids',
    options: [
      {
        label: 'Chambers of Xeric',
        value: Raid.ChambersOfXeric,
        entity: { teamSize: 10 },
      },
      {
        label: 'Theatre of Blood',
        value: Raid.TheatreOfBlood,
        entity: { teamSize: 5 },
      },
      {
        label: 'Tombs of Amascut',
        value: Raid.TombsOfAmascut,
        entity: { teamSize: 8 },
      },
    ],
  },
  { label: 'Test', options: [{ label: 'Test', value: 'test' }] },
];

const ActivitySelect = () => {
  const [selected, setSelected] = useState<Option[]>([ACTIVITIES[0]]);

  const handleChange = (selected: Option[]) => {
    setSelected(selected);
  };

  return (
    <Select
      value={selected}
      options={ACTIVITIES}
      onChange={handleChange}
      placeholder="Choose activity"
    />
  );
};

export default ActivitySelect;
