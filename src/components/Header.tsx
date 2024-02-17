import {
  UserIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { DIALOG_SET_USERNAME } from './Dialogs/SetUsername';

import { useAuth } from 'contexts/AuthContext';

const Header = () => {
  const { user, data } = useAuth();

  const [top, setTop] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const shouldShowDivider = !!data?.group;

  return (
    <div
      className={`navbar sticky top-0 z-40 bg-black-pearl-900 ${
        !top && `shadow-md`
      }`}
    >
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case  hover:bg-black-pearl-800"
        >
          <img
            src="/images/logo.png"
            alt="RuneFinder logo"
            className="h-8 w-8 object-contain"
          />
          <p
            className={`text-xl text-black-pearl-100 ${
              !user ? 'hidden xs:block' : ''
            }`}
          >
            RuneFinder
          </p>
        </Link>
      </div>
      <div className="navbar-end gap-1">
        {user && (
          <>
            {!!data?.group && (
              <NavLink
                to={`/group/${data.group.id}`}
                className={({ isActive }) =>
                  `btn btn-ghost hidden font-extrabold hover:bg-black-pearl-800 sm:flex ${
                    isActive ? 'text-anzac-400' : ''
                  }`
                }
              >
                <UsersIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
                My group
              </NavLink>
            )}
            {shouldShowDivider && (
              <div className="divider divider-horizontal hidden p-2 sm:flex" />
            )}
          </>
        )}
        {!user && (
          <>
            <button
              className="btn btn-ghost font-bold hover:bg-black-pearl-800"
              onClick={() => navigate('?signin')}
            >
              Sign in
            </button>
            <button
              className="btn btn-primary font-bold"
              onClick={() => navigate('?signup')}
            >
              Sign up
            </button>
          </>
        )}
        <NavLink
          to="/groups"
          className={({ isActive }) =>
            `btn btn-ghost w-12 p-0 hover:bg-black-pearl-800 sm:flex ${
              isActive ? 'text-anzac-400' : ''
            } ${user ? 'hidden' : ''}`
          }
        >
          <MagnifyingGlassIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
        </NavLink>
        {user && (
          <>
            {!data?.username ? (
              <NavLink
                to={`?${DIALOG_SET_USERNAME}&redirect`}
                className={
                  'btn btn-ghost hidden w-12 p-0 hover:bg-black-pearl-800 sm:flex'
                }
              >
                <UserIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
              </NavLink>
            ) : (
              <NavLink
                to={`/player/${user.id}`}
                className={({ isActive }) =>
                  `btn btn-ghost hidden w-12 p-0 hover:bg-black-pearl-800 sm:flex ${
                    isActive ? 'text-anzac-400' : ''
                  }`
                }
              >
                <UserIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
              </NavLink>
            )}
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `btn btn-ghost hidden w-12 p-0 hover:bg-black-pearl-800 sm:flex ${
                  isActive ? 'text-anzac-400' : ''
                }`
              }
            >
              <Cog6ToothIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
            </NavLink>
          </>
        )}
        <NavLink
          to="/info"
          className={({ isActive }) =>
            `btn btn-ghost w-12 p-0 hover:bg-black-pearl-800 ${
              isActive ? 'text-anzac-400' : ''
            }`
          }
        >
          <QuestionMarkCircleIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
