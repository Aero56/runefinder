import { format } from 'date-fns';

const NewsAndUpdates = () => {
  return (
    <div className="h-min w-full rounded-xl bg-black-pearl-900 p-4 lg:w-2/3">
      <h2 className="mb-4 font-semibold">News & Updates</h2>
      <div className="rounded-xl border-2 border-black-pearl-800 bg-black-pearl-950 p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium text-anzac-400">
            RuneFinder released!
          </h2>
          <p className="text-black-pearl-100/60">
            {format(new Date('2024-02-17'), 'P')}
          </p>
        </div>
        <p className="mt-2">
          It's taken me a while, but it's finally out!
          <br />
          Future updates will be posted here.
        </p>
        <p className="mt-4">Planned updates:</p>
        <li className="indent-2">Group chats</li>
        <li className="indent-2">
          Automatic discord channels only accessible to group members
        </li>
      </div>
    </div>
  );
};

export default NewsAndUpdates;
