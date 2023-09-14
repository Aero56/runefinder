import { Link, useNavigate } from 'react-router-dom';
import useGroupsQuery from '@hooks/useGroupsQuery';

const Home = () => {
  const navigate = useNavigate();

  const { data: groups, isLoading } = useGroupsQuery({
    order: { column: 'updated_at', options: { ascending: false } },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
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
