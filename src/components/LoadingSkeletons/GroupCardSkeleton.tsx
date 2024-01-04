const GroupCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-black-pearl-800 bg-black-pearl-900 p-4">
      <div>
        <div className="skeleton h-5 w-40 bg-black-pearl-950/60 xs:w-64" />
        <div className="skeleton mt-2 h-5 w-28 bg-black-pearl-950/60 xs:w-40" />
        <div className="skeleton mt-4 h-10 w-32 rounded-full bg-black-pearl-950/60 xs:w-48" />
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="skeleton h-5 w-24 rounded-full bg-black-pearl-950/60" />
          <div className="skeleton h-5 w-14 rounded-full bg-black-pearl-950/60" />
          <div className="skeleton hidden h-5 w-20 rounded-full bg-black-pearl-950/60 xs:block" />
          <div className="skeleton hidden h-5 w-32 rounded-full bg-black-pearl-950/60 xs:block" />
        </div>
      </div>
      <div className="skeleton h-12 w-12 flex-shrink-0 rounded-full bg-black-pearl-950/60 xs:w-24 xs:rounded-lg" />
    </div>
  );
};

export default GroupCardSkeleton;
