const NewsAndUpdates = () => {
  return (
    <div className="h-min w-full rounded-xl bg-black-pearl-900 p-4 lg:w-2/3">
      <h2 className="mb-4 font-semibold">News & Updates</h2>
      <div className="rounded-xl bg-black-pearl-950 p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-anzac-400">
            RuneFinder released!
          </h2>
          <p className="text-black-pearl-100/60">TBA</p>
        </div>
        <p className="mt-2">
          It's taken me a while, but it's finally out!
          <br />
          Future updates will be posted here.
        </p>
      </div>
    </div>
  );
};

export default NewsAndUpdates;
