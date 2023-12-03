import {
  Cog6ToothIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

const BottomNavigation = () => {
  const { user, data } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="btm-nav flex bg-black-pearl-900 sm:hidden">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active text-anzac-400' : '')}
      >
        <HomeIcon className="h-6 w-6" />
      </NavLink>
      {data?.group_id && (
        <NavLink
          to={`/group/${data.group_id}`}
          className={({ isActive }) =>
            isActive ? 'active text-anzac-400' : ''
          }
        >
          <UsersIcon className="h-6 w-6" />
        </NavLink>
      )}
      <NavLink
        to={`/player/${user.id}`}
        className={({ isActive }) => (isActive ? 'active text-anzac-400' : '')}
      >
        <UserIcon className="h-6 w-6" />
      </NavLink>
      <NavLink
        to={`/settings`}
        className={({ isActive }) => (isActive ? 'active text-anzac-400' : '')}
      >
        <Cog6ToothIcon className="h-6 w-6" />
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
