import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@api/supabase';
import { User } from '@supabase/supabase-js';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getAuth() {
      const { data } = await supabase.auth.getSession();
      data.session && setUser(data.session.user);
    }

    getAuth();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Home;
