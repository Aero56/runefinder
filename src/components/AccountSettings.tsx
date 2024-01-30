import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { supabase } from 'api/supabase';
import { useAuth } from 'contexts/AuthContext';

const AccountSettings = () => {
  const { user } = useAuth();
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
      <div className="flex flex-wrap items-center justify-between rounded-t-xl border-b-2 border-black-pearl-700 bg-black-pearl-800 p-4 font-semibold">
        <p className="mr-2">Account settings</p>
        <p className="text-xs text-black-pearl-200/40">{user?.id}</p>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <p>{user?.email}</p>
          {user?.new_email && (
            <p className="text-sm text-black-pearl-100/50">
              {user.new_email} (pending confirmation)
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/settings/change-email')}
          >
            Change email
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/settings/change-password')}
          >
            Change password
          </button>
          <button
            className="btn border-none bg-red-500 hover:bg-red-600"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
