import { Link, useNavigate } from 'react-router-dom';
import useGroupsQuery from '@hooks/useGroupsQuery';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const Home = () => {
  const navigate = useNavigate();

  const { data: groups, isLoading } = useGroupsQuery({
    order: { column: 'updated_at', options: { ascending: false } },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container pt-4">
      <div className="flex justify-between">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="border-bg btn border-2 border-black-pearl-900 bg-black-pearl-950 hover:border-black-pearl-900 hover:bg-black-pearl-900"
          >
            Filter
            <ChevronDownIcon className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] mt-1 w-52 bg-black-pearl-800 p-2 shadow"
          >
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Item 2</button>
            </li>
          </ul>
        </div>
        <button className="btn hidden bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300 xs:flex ">
          <PlusIcon className="h-6 w-6" />
          Create party
        </button>
        <button className="btn btn-circle fixed bottom-6 right-6 flex bg-anzac-400 text-black-pearl-900 hover:bg-anzac-300 xs:hidden">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      {groups && (
        <div className="mt-5 flex flex-col gap-5">
          {groups.map((group) => (
            <button
              key={group.id}
              className="flex flex-col rounded bg-black-pearl-900 p-4 transition-colors duration-300 hover:bg-gray-900"
              onClick={() => navigate(`/group/${group.id}`)}
            >
              <p>{group.name}</p>
              <p>
                {group.users.map((user, i) => (
                  <span key={user.id}>
                    {i > 0 && ', '}
                    <Link
                      to={`/player/${user.username}`}
                      className="font-medium text-anzac-400 hover:underline"
                    >
                      {user.username}
                    </Link>
                  </span>
                ))}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
