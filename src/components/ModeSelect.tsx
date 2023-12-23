import { useState } from 'react';

import Select, { Option, Tint } from './Select';

export enum Gamemode {
  Ironman = 'ironman',
  Hardcore = 'hardcore',
  Ultimate = 'ultimate',
}

export const GAMEMODES = [
  {
    label: 'Open to anyone',
    value: null,
    entity: { teamSize: 4 },
  },
  {
    label: 'Ironman only',
    value: Gamemode.Ironman,
  },
  {
    label: 'Hardcore Ironman only',
    value: Gamemode.Hardcore,
  },
  {
    label: 'Ultimate Ironman only',
    value: Gamemode.Ultimate,
  },
];

interface ExperienceSelectProps {
  value: Option<Gamemode | null> | null;
  onChange: (value: Option<Gamemode | null>) => void;
  className?: string;
  tint?: Tint;
}

const ModeSelect = ({
  value,
  onChange,
  className,
  tint,
}: ExperienceSelectProps) => {
  const [selected, setSelected] = useState<Option<Gamemode | null>>(
    value ?? GAMEMODES[0],
  );

  const handleChange = (value: Option<Gamemode | null>[]) => {
    onChange(value[0]);
    setSelected(value[0]);
  };

  return (
    <Select
      value={[selected]}
      onChange={handleChange}
      options={GAMEMODES}
      placeholder="Select mode"
      className={className}
      tint={tint}
    />
  );
};

export default ModeSelect;
