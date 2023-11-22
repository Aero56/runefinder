import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { useState } from 'react';
import { Activity } from '@/types/generic';
import SelectMenu from './SelectMenu';

type Entity = Activity;

export interface Option {
  label: string;
  value?: string | number | null;
  options?: Option[];
  entity?: Entity;
}

interface SelectProps {
  value: Option[];
  placeholder?: string;
  options: Option[];
  isMulti?: boolean;
  isClearable?: boolean;
  onChange: (selected: Option[]) => void;
  className?: string;
}

const Select = ({
  value,
  options,
  onChange,
  isMulti = false,
  isClearable = false,
  placeholder = 'Select',
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<Option>>(new Set(value ?? []));

  const { context, refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        apply({ elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const handleSelect = (value: Option) => {
    let selection = selected;

    if (!selection.has(value)) {
      if (!isMulti) {
        selection = new Set([value]);
      } else if (isMulti) {
        selection.add(value);
      }
    } else {
      if (selection.size > 1 || isClearable) {
        selection.delete(value);
      }
    }

    setSelected(new Set(selection));
    onChange([...selection]);
    !isMulti && setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`border-bg btn border-2 border-black-pearl-900 bg-black-pearl-950 hover:border-black-pearl-900 hover:bg-black-pearl-900 ${className} flex flex-nowrap justify-between`}
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {[...selected][0]?.label ?? placeholder}
        </p>
        <ChevronDownIcon className="h-6 w-6" />
      </button>
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="menu rounded-box block w-56 overflow-y-auto bg-black-pearl-800"
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...transitionStyles }}
              {...getFloatingProps()}
            >
              <SelectMenu
                options={options}
                onSelect={handleSelect}
                selected={selected}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default Select;
