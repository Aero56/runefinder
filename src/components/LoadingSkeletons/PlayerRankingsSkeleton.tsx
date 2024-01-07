const PlayerRankingsSkeleton = () => {
  return (
    <div className="w-full">
      <div className="p-4">
        <>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-1">
              <div className="skeleton h-5 w-20 bg-black-pearl-950/60" />
              <div className="skeleton h-10 w-28 bg-black-pearl-950/60" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="skeleton h-5 w-24 bg-black-pearl-950/60" />
              <div className="skeleton h-10 w-16 bg-black-pearl-950/60" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="skeleton h-5 w-24 bg-black-pearl-950/60" />
              <div className="skeleton h-10 w-20 bg-black-pearl-950/60" />
            </div>
          </div>
          <div className="divider my-4" />
          <div className="flex flex-wrap gap-2">
            <div className="skeleton h-28 w-44 bg-black-pearl-950/60" />
            <div className="skeleton h-28 w-36 bg-black-pearl-950/60" />
            <div className="skeleton h-28 w-48 bg-black-pearl-950/60" />
          </div>
        </>
      </div>
    </div>
  );
};

export default PlayerRankingsSkeleton;
