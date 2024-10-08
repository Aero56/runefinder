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

type OptionValue = string | number | null;

export type Tint = 'light' | 'dark';

export interface Option<T extends OptionValue, E = undefined> {
  label: string;
  value?: T;
  options?: Option<T, E>[];
  entity?: E;
}

interface SelectProps<T extends OptionValue, E = undefined> {
  value: Option<T, E>[];
  placeholder?: string;
  options: Option<T, E>[];
  isMulti?: boolean;
  isClearable?: boolean;
  onChange: (selected: Option<T, E>[]) => void;
  className?: string;
  tint?: Tint;
  disabled?: boolean;
}

const Select = <T extends OptionValue, E = undefined>({
  value,
  options,
  onChange,
  isMulti = false,
  isClearable = false,
  placeholder = 'Select',
  className,
  tint = 'dark',
  disabled,
}: SelectProps<T, E>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<Option<T, E>>>(
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
    useClick(context, { event: 'mousedown' }),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const handleSelect = (value: Option<T, E>) => {
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
        className={`${className} border-bg btn flex flex-nowrap justify-between border-2 shadow-none ${
          tint === 'dark'
            ? `border-black-pearl-950 bg-black-pearl-950 hover:border-black-pearl-800 hover:bg-black-pearl-800 ${
                disabled ? '!bg-black-pearl-950' : ''
              }`
            : `border-black-pearl-900 bg-black-pearl-900 hover:border-black-pearl-900 hover:bg-black-pearl-950 ${
                disabled ? '!bg-black-pearl-900' : ''
              }`
        }`}
        disabled={disabled}
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
              className={`menu z-50 block w-56 overflow-y-auto rounded-box shadow-md ${
                tint === 'dark' ? 'bg-black-pearl-950' : 'bg-black-pearl-900'
              }`}
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
