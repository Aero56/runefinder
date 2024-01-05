import { Option } from './Select';

type OptionValue = string | number | null;

interface SelectMenuProps<T extends OptionValue> {
  options: Option<T>[];
  onSelect: (selected: Option<T>) => void;
  selected: Set<Option<T>>;
}

const SelectMenu = <T extends OptionValue>({
  options,
  onSelect,
  selected,
}: SelectMenuProps<T>) => {
  const handleSelect = (option: Option<T>) => {
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
              className={`active:!bg-anzac-400 active:!text-black-pearl-950 ${
                [...selected].find(
                  (selectedOption) => selectedOption.value === option.value,
                )
                  ? '!bg-anzac-400 font-medium !text-black-pearl-950'
                  : ''
              }`}
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
