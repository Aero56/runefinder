import { useToaster } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      className="top-3 right-3 fixed transition ease-in-out delay-150 flex flex-col gap-2"
    >
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div
            key={toast.id}
            {...toast.ariaProps}
            id="toast-simple"
            className="flex items-center w-full max-w-xs p-4 space-x-4 text-slate-50 bg-slate-900 divide-x rounded-lg shadow "
            role="alert"
          >
            <div className="text-sm font-normal">
              {toast.message?.toString()}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notifications;