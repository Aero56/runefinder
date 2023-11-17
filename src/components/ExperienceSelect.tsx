import Select, { Option } from './Select';
import { useState } from 'react';

export enum Experience {
  Beginner = 'beginner',
  Average = 'average',
  Experienced = 'experienced',
}

export const EXPERIENCE_TYPES = [
  {
    label: 'Any',
    value: null,
    entity: { teamSize: 4 },
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
  value: Option | null;
  onChange: (value: Option) => void;
  className?: string;
}

const ExperienceSelect = ({
  value,
  onChange,
  className,
}: ExperienceSelectProps) => {
  const [selected, setSelected] = useState<Option>(
    value ?? EXPERIENCE_TYPES[0],
  );

  const handleChange = (value: Option[]) => {
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
    />
  );
};

export default ExperienceSelect;
