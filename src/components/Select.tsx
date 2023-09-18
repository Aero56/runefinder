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

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  multiSelect?: boolean;
  onChange: (selected: Option[]) => void;
}

const Select = ({
  label,
  options,
  onChange,
  multiSelect = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<Option>>(new Set([]));

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
      if (!multiSelect) {
        selection = new Set([value]);
      } else if (multiSelect) {
        selection.add(value);
      }
    } else {
      selection.delete(value);
    }

    setSelected(new Set(selection));
    onChange([...selection]);
    !multiSelect && setIsOpen(false);
  };

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="border-bg btn border-2 border-black-pearl-900 bg-black-pearl-950 hover:border-black-pearl-900 hover:bg-black-pearl-900"
      >
        {label}
        <ChevronDownIcon className="h-6 w-6" />
      </button>
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="menu rounded-box block w-56 space-y-1 overflow-y-auto bg-black-pearl-800"
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...transitionStyles }}
              {...getFloatingProps()}
            >
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={`${selected.has(option) ? 'active' : ''}`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default Select;
