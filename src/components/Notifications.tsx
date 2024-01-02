import { XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer, TypeOptions } from 'react-toastify';

const CONTEXT_CLASSES: Record<TypeOptions, string> = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-black-pearl-900',
};

const CloseButton = () => {
  return (
    <button className="btn btn-circle btn-ghost btn-sm">
      <XMarkIcon className="h-5 w-5" />
    </button>
  );
};

const Notifications = () => {
  return (
    <ToastContainer
      position="bottom-right"
      className={(type) =>
        type?.defaultClassName +
        ' !bottom-[62px] gap-2 xs:!bottom-20 sm:!bottom-6'
      }
      toastClassName={(type) =>
        CONTEXT_CLASSES[type?.type || 'default'] +
        ' relative flex p-2 min-h-10 xs:rounded-md justify-between overflow-hidden cursor-pointer xs:shadow-xl xs:mb-2'
      }
      bodyClassName={() => 'text-sm font-med block p-3 text-black-pearl-100'}
      progressClassName={(type) =>
        type?.defaultClassName + ' ![background:theme(colors.anzac.400)]'
      }
      closeButton={CloseButton}
      limit={3}
    />
  );
};

export default Notifications;
