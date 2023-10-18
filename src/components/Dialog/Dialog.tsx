import { XMarkIcon } from '@heroicons/react/20/solid';

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { ReactNode } from 'react';

export type Size = 'small' | 'large';

interface DialogProps {
  isOpen: boolean;
  children: ReactNode;
  size?: Size;
  isLoading?: boolean;
  onClose: () => void;
}

const Dialog = ({ isOpen, children, size = 'large', onClose }: DialogProps) => {
  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: (open) => !open && handleClose(),
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  });

  const handleClose = () => {
    onClose();
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return 'max-w-md';
      case 'large':
        return 'max-w-2xl';
    }
  };

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingOverlay
          className="grid place-items-center bg-black-pearl-950/30 px-4"
          style={{ ...transitionStyles }}
          lockScroll
        >
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              style={{ ...transitionStyles }}
              {...getFloatingProps()}
              className={`modal-box w-full scale-100 bg-black-pearl-900 ${getSize()}`}
            >
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={handleClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Dialog;
