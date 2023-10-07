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

type Size = 'small' | 'large';

type Action = {
  label: string;
  onClick: () => void;
};

interface DialogProps {
  isOpen: boolean;
  title: ReactNode;
  children: ReactNode;
  primaryAction: Action;
  secondaryAction?: Action;
  size?: Size;
  isLoading?: boolean;
  onClose: () => void;
}

const Dialog = ({
  isOpen,
  isLoading,
  title,
  children,
  size = 'large',
  primaryAction,
  secondaryAction,
  onClose,
}: DialogProps) => {
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
              <h3 className="mb-4 text-xl font-bold">{title}</h3>
              {children}
              {size === 'small' ? (
                <div className="mt-5 flex flex-row-reverse gap-2">
                  <button
                    className="btn w-28 bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300"
                    onClick={primaryAction.onClick}
                  >
                    {!isLoading ? (
                      primaryAction.label
                    ) : (
                      <span className="loading loading-spinner"></span>
                    )}
                  </button>
                  {secondaryAction && (
                    <button
                      className="btn btn-ghost w-24 font-bold "
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-5 w-full">
                  <button
                    className="btn w-full bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300"
                    onClick={primaryAction.onClick}
                  >
                    {!isLoading ? (
                      primaryAction.label
                    ) : (
                      <span className="loading loading-spinner"></span>
                    )}
                  </button>
                  {secondaryAction && (
                    <button
                      className="btn btn-ghost mt-2 w-full"
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </button>
                  )}
                </div>
              )}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Dialog;
