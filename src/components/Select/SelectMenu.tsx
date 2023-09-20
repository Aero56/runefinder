import { Option } from './Select';

interface SelectMenuProps {
  options: Option[];
  onSelect: (selected: Option) => void;
  selected: Set<Option>;
}

const SelectMenu = ({ options, onSelect, selected }: SelectMenuProps) => {
  const handleSelect = (option: Option) => {
    onSelect(option);
  };

  return (
    <ul className="space-y-1">
      {options.map((option) => (
        <li key={option.value || option.label}>
          {Array.isArray(option.options) ? (
            <details open>
              <summary>{option.label}</summary>
              <SelectMenu
                options={option.options}
                onSelect={handleSelect}
                selected={selected}
              />
            </details>
          ) : (
            <button
              onClick={() => handleSelect(option)}
              className={`${selected.has(option) ? 'active' : ''}`}
            >
              {option.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectMenu;
