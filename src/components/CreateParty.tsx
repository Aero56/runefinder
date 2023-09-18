import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef } from 'react';

interface CreatePartyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateParty = ({ isOpen, onClose }: CreatePartyProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      id="create-party"
      className="modal"
      onClose={handleClose}
    >
      <div className="modal-box max-w-2xl bg-black-pearl-900">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={handleClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h3 className="mb-4 text-xl font-bold">Create fireteam</h3>
        <form method="dialog" className="space-y-6">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="border-bg btn border-2 border-black-pearl-900 bg-black-pearl-950 hover:border-black-pearl-900 hover:bg-black-pearl-900"
            >
              Choose activity
              <ChevronDownIcon className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] mt-1 w-52 bg-black-pearl-800 p-2 shadow"
            >
              <li>
                <button>Item 1</button>
              </li>
              <li>
                <button>Item 2</button>
              </li>
            </ul>
          </div>
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
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreateParty;
