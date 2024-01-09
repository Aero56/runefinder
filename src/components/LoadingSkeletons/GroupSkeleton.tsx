import { PencilIcon } from '@heroicons/react/24/solid';

const GroupSkeleton = () => {
  return (
    <div className="container mb-4 mt-16 flex flex-col gap-4 p-4">
      <div className="flex h-[212px] flex-col justify-between rounded-xl bg-black-pearl-900 p-4">
        <PencilIcon className="m-1.5 ml-auto h-5 w-5 [&>path]:stroke-[2.5]" />

        <div className="flex flex-col gap-2">
          <div className="skeleton h-5 w-32 bg-black-pearl-950/60" />
          <div className="skeleton h-8 w-60 bg-black-pearl-950/60 xs:w-96" />
          <div className="mt-2 flex gap-3">
            <div className="skeleton h-5 w-24 bg-black-pearl-950/60" />
            <div className="skeleton h-5 w-12 bg-black-pearl-950/60" />
            <div className="skeleton h-5 w-16 bg-black-pearl-950/60" />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-black-pearl-900">
        <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
          Players
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="skeleton h-[88px] w-full border-2 border-black-pearl-800 bg-black-pearl-950/60" />
          <div className="divider my-2" />
          {[...Array(2)].map(() => (
            <div className="skeleton h-[88px] w-full border-2 border-black-pearl-800 bg-black-pearl-950/60 opacity-50" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupSkeleton;
