type Action = {
  label: string;
  onClick: () => void;
};

interface DialogFooterProps {
  primaryAction: Action;
  secondaryAction?: Action;
  isLoading?: boolean;
  isCompact?: boolean;
}

const DialogFooter = ({
  primaryAction,
  secondaryAction,
  isLoading,
  isCompact,
}: DialogFooterProps) => {
  return isCompact ? (
    <div className="mt-5 flex flex-row-reverse gap-2">
      <button
        className="btn btn-primary w-28 font-bold"
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
        className="btn btn-primary w-full font-bold"
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
