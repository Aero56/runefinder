import Select, { Option } from './Select';
import { useState } from 'react';

export enum Mode {
  Ironman = 'ironman',
  Hardcore = 'hardcore',
  Ultimate = 'ultimate',
}

export const MODES = [
  {
    label: 'Open To Anyone',
    value: null,
    entity: { teamSize: 4 },
  },
  {
    label: 'Ironman Only',
    value: Mode.Ironman,
  },
  {
    label: 'Hardcore Ironman Only',
    value: Mode.Hardcore,
  },
  {
    label: 'Ultimate Ironman Only',
    value: Mode.Ultimate,
  },
];

interface ExperienceSelectProps {
  value: Option<Mode | null> | null;
  onChange: (value: Option<Mode | null>) => void;
  className?: string;
}

const ModeSelect = ({ value, onChange, className }: ExperienceSelectProps) => {
  const [selected, setSelected] = useState<Option<Mode | null>>(
    value ?? MODES[0],
  );

  const handleChange = (value: Option<Mode | null>[]) => {
    onChange(value[0]);
    setSelected(value[0]);
  };

  return (
    <Select
      value={[selected]}
      onChange={handleChange}
      options={MODES}
      placeholder="Select mode"
      className={className}
    />
  );
};

export default ModeSelect;