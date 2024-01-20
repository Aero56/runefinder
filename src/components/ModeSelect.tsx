import { useState } from 'react';

import Select, { Option, Tint } from './Select';

import { useAuth } from 'contexts/AuthContext';

export enum Gamemode {
  Ironman = 'ironman',
  Hardcore = 'hardcore',
  Ultimate = 'ultimate',
}

export const GAMEMODES = [
  {
    label: 'Open to anyone',
    value: null,
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
  disabled?: boolean;
  isFilter?: boolean;
}

const ModeSelect = ({
  value,
  onChange,
  className,
  tint,
  disabled,
  isFilter,
}: ExperienceSelectProps) => {
  const { data } = useAuth();

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
      options={
        isFilter
          ? GAMEMODES
          : GAMEMODES.filter((gamemode) => {
              if (
                (data?.stats.gamemode === Gamemode.Ironman ||
                  data?.stats.gamemode === Gamemode.Hardcore) &&
                gamemode.value === Gamemode.Ultimate
              ) {
                return;
              }

              if (
                (data?.stats.gamemode === Gamemode.Ironman ||
                  data?.stats.gamemode === Gamemode.Ultimate) &&
                gamemode.value === Gamemode.Hardcore
              ) {
                return;
              }

              return gamemode;
            })
      }
      placeholder="Select mode"
      className={className}
      tint={tint}
      disabled={disabled}
    />
  );
};

export default ModeSelect;
