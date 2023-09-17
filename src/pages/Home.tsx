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
            className="btn bg-black-pearl-950 border-bg border-2 border-black-pearl-900 hover:bg-black-pearl-900 hover:border-black-pearl-900"
          >
            Filter
            <ChevronDownIcon className="w-6 h-6" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-black-pearl-800 rounded-box w-52 mt-1"
          >
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Item 2</button>
            </li>
          </ul>
        </div>
        <button className="hidden xs:flex btn bg-anzac-400 hover:bg-anzac-300 text-black-pearl-900 font-bold ">
          <PlusIcon className="w-6 h-6" />
          Create party
        </button>
        <button className="flex xs:hidden btn btn-circle fixed bottom-6 right-6 bg-anzac-400 hover:bg-anzac-300 text-black-pearl-900">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      {groups && (
        <div className="flex flex-col gap-5 mt-5">
          {groups.map((group) => (
            <button
              key={group.id}
              className="flex flex-col p-4 rounded bg-black-pearl-900 hover:bg-gray-900 transition-colors duration-300"
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
