import { useNavigate } from 'react-router-dom';
import { supabase } from '@api/supabase';
import { useAuth } from '@contexts/AuthContext';

const Account = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <p>{user?.email}</p>
      <button
        className="p-4 w-32 text-center bg-slate-600"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </>
  );
};

export default Account;
