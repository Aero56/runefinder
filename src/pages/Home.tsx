import { useAuth } from '@contexts/AuthContext';
import { Link } from 'react-router-dom';
import useGroupsQuery from '@hooks/useGroupsQuery';

const Home = () => {
  const { user } = useAuth();

  const { data: groups, isLoading } = useGroupsQuery({
    order: { column: 'updated_at', options: { ascending: false } },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-4">
      <h1 className="text-3xl">RuneFinder</h1>

      {user ? (
        <Link to="/account">
          <p className="p-4 w-32 text-center bg-slate-600">Account </p>
        </Link>
      ) : (
        <Link to="/login">
          <p className="p-4 w-32 text-center bg-slate-600">Log in </p>
        </Link>
      )}

      {groups && (
        <div className="flex flex-col gap-5 mt-5">
          {groups.map((group) => (
            <Link key={group.id} to={`/group/${group.id}`}>
              <div className="flex flex-col p-4 rounded bg-slate-700">
                <p>{group.name}</p>
                <p>
                  {group.users.map((user, i) => (
                    <span key={user.id}>
                      {i > 0 && ', '}
                      <Link
                        to={`/player/${user.username}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {user.username}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
