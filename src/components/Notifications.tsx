import { useToaster } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      className="fixed right-3 top-20 z-50 flex flex-col gap-2 transition delay-150 ease-in-out"
    >
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div
            key={toast.id}
            {...toast.ariaProps}
            id="toast-simple"
            className="flex w-full max-w-xs items-center space-x-4 divide-x rounded-lg  bg-black-pearl-800 p-4 shadow "
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
