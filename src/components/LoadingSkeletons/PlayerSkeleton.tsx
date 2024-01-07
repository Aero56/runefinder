const PlayerSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="skeleton h-7 w-32 bg-black-pearl-950/60" />
        <div className="skeleton h-7 w-12 bg-black-pearl-950/60" />
      </div>
      <div className="skeleton mt-2 h-5 w-28 bg-black-pearl-950/60" />
      <div className="skeleton mt-4 h-12 w-full rounded-xl bg-black-pearl-950/60" />
      <div className="skeleton mt-2 h-20 w-full rounded-xl bg-black-pearl-950/60" />
      <div className="skeleton mt-6 h-5 w-40 rounded-xl bg-black-pearl-950/60" />
    </div>
  );
};

export default PlayerSkeleton;
