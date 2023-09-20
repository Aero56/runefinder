import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import ActivitySelect from './ActivitySelect';
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

const CreateParty = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <button
          className="btn hidden bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300 xs:flex"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
          Create party
        </button>
        <button
          className="btn btn-circle fixed bottom-6 right-6 flex border-none bg-anzac-400 text-black-pearl-900 shadow hover:bg-anzac-300 xs:hidden"
          type="button"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
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
                className="modal-box w-full max-w-2xl scale-100 bg-black-pearl-900"
              >
                <button
                  className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                  onClick={handleClose}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="mb-4 text-xl font-bold">Create party</h3>
                <form method="dialog" className="space-y-6">
                  <ActivitySelect />
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm">
                      Party name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="This is a party name"
                      className={`input w-full bg-black-pearl-950 `}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm">
                      Players needed
                    </label>
                    <div className="join">
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="1"
                        name="radio"
                      />
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="2"
                        name="radio"
                      />
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="3"
                        name="radio"
                      />
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="4"
                        name="radio"
                      />
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="5"
                        name="radio"
                      />
                      <input
                        className="btn join-item border-none bg-black-pearl-950 hover:bg-black-pearl-800"
                        type="radio"
                        aria-label="6"
                        name="radio"
                      />
                    </div>
                  </div>
                  <button className="btn mt-5 w-full bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300">
                    Create party
                  </button>
                </form>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};

export default CreateParty;
