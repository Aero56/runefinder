import { Table } from '@/types/supabase';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Group extends Table<'groups'> {
  users: {
    id: string;
    username: string;
  }[];
}

const Home = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[] | null>(null);

  const getGroups = useCallback(async () => {
    const { data } = await supabase
      .from('groups')
      .select('*, users!users_group_id_fkey(id, username)')
      .order('updated_at', { ascending: false });

    setGroups(data ?? null);
  }, []);

  useEffect(() => {
    getGroups();
  }, [getGroups, user]);

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
            <div className="flex flex-col p-4 rounded bg-slate-700">
              <p>{group.name}</p>
              <p>{group.users.map((user) => user.username).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
