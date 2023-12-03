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
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import SelectMenu from './SelectMenu';

import { Activity } from 'types/generic';

type Entity = Activity;

type OptionValue = string | number | null;

export interface Option<T extends OptionValue> {
  label: string;
  value?: T;
  options?: Option<T>[];
  entity?: Entity;
}

interface SelectProps<T extends OptionValue> {
  value: Option<T>[];
  placeholder?: string;
  options: Option<T>[];
  isMulti?: boolean;
  isClearable?: boolean;
  onChange: (selected: Option<T>[]) => void;
  className?: string;
}

const Select = <T extends OptionValue>({
  value,
  options,
  onChange,
  isMulti = false,
  isClearable = false,
  placeholder = 'Select',
  className,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<Option<T>>>(
    new Set(value ?? []),
  );

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

  const handleSelect = (value: Option<T>) => {
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
              className="menu block w-56 overflow-y-auto rounded-box bg-black-pearl-800"
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
