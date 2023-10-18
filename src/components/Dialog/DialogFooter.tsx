import { Size } from './Dialog';

type Action = {
  label: string;
  onClick: () => void;
};

interface DialogFooterProps {
  primaryAction: Action;
  secondaryAction?: Action;
  isLoading?: boolean;
  size?: Size;
}

const DialogFooter = ({
  size,
  isLoading,
  primaryAction,
  secondaryAction,
}: DialogFooterProps) => {
  return size === 'small' ? (
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
  );
};

export default DialogFooter;
