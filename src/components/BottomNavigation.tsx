import {
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

import { DIALOG_SET_USERNAME } from './Dialogs/SetUsername';

import { useAuth } from 'contexts/AuthContext';

const BottomNavigation = () => {
  const { user, data } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="btm-nav z-40 flex bg-black-pearl-900 sm:hidden">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `transition-colors ${isActive ? 'active text-anzac-400' : ''}`
        }
      >
        <HomeIcon className="h-6 w-6" />
      </NavLink>
      <NavLink
        to="/groups"
        className={({ isActive }) =>
          `transition-colors ${isActive ? 'active text-anzac-400' : ''}`
        }
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </NavLink>
      {data?.group.id && (
        <NavLink
          to={`/group/${data.group.id}`}
          className={({ isActive }) =>
            `transition-colors ${isActive ? 'active text-anzac-400' : ''}`
          }
        >
          <UsersIcon className="h-6 w-6" />
        </NavLink>
      )}
      {!data?.username ? (
        <NavLink
          to={`?${DIALOG_SET_USERNAME}&redirect`}
          className={'border-0 bg-black-pearl-900'}
        >
          <UserIcon className="h-6 w-6" />
        </NavLink>
      ) : (
        <NavLink
          to={`/player/${user.id}`}
          className={({ isActive }) =>
            `transition-colors ${isActive ? 'active text-anzac-400' : ''}`
          }
        >
          <UserIcon className="h-6 w-6" />
        </NavLink>
      )}
      <NavLink
        to={`/settings`}
        className={({ isActive }) =>
          `transition-colors ${isActive ? 'active text-anzac-400' : ''}`
        }
      >
        <Cog6ToothIcon className="h-6 w-6" />
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
