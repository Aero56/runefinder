import { Option } from './Select';

type OptionValue = string | number | null;

interface SelectMenuProps<T extends OptionValue, E = undefined> {
  options: Option<T, E>[];
  onSelect: (selected: Option<T, E>) => void;
  selected: Set<Option<T, E>>;
}

const SelectMenu = <T extends OptionValue, E = undefined>({
  options,
  onSelect,
  selected,
}: SelectMenuProps<T, E>) => {
  const handleSelect = (option: Option<T, E>) => {
    onSelect(option);
  };

  return (
    <ul className="space-y-1">
      {options.map((option) => (
        <li key={option.value || option.label}>
          {Array.isArray(option.options) ? (
            <details
              open={[...selected].some(
                (selectedOption) =>
                  option.options?.find(
                    (option) => option.value === selectedOption.value,
                  ),
              )}
            >
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
