import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { supabase } from 'api/supabase';

const AccountSettings = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast('Something went wrong!');
      return;
    }

    navigate('/');
  };

  return (
    <div className="col-span-1 rounded-xl bg-black-pearl-900 sm:col-span-5">
      <div className="flex items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        Account settings
      </div>
      <div className="flex flex-wrap gap-2 p-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/settings/change-password')}
        >
          Change password
        </button>
        <button className="btn btn-primary" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
