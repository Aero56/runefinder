import { useState } from 'react';

import Select, { Option, Tint } from './Select';

export enum Experience {
  Beginner = 'beginner',
  Average = 'average',
  Experienced = 'experienced',
}

export const EXPERIENCE_TYPES = [
  {
    label: 'Any level',
    value: null,
  },
  {
    label: 'Beginner',
    value: Experience.Beginner,
  },
  {
    label: 'Average',
    value: Experience.Average,
  },
  {
    label: 'Experienced',
    value: Experience.Experienced,
  },
];

interface ExperienceSelectProps {
  value: Option<Experience | null> | null;
  onChange: (value: Option<Experience | null>) => void;
  className?: string;
  tint?: Tint;
}

const ExperienceSelect = ({
  value,
  onChange,
  className,
  tint,
}: ExperienceSelectProps) => {
  const [selected, setSelected] = useState<Option<Experience | null>>(
    value ?? EXPERIENCE_TYPES[0],
  );

  const handleChange = (value: Option<Experience | null>[]) => {
    onChange(value[0]);
    setSelected(value[0]);
  };

  return (
    <Select
      value={[selected]}
      onChange={handleChange}
      options={EXPERIENCE_TYPES}
      placeholder="Select experience"
      className={className}
      tint={tint}
    />
  );
};

export default ExperienceSelect;
