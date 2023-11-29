import { useAuth } from '@contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

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

  const shouldShowDivider = !!data?.group_id;

  return (
    <div
      className={`navbar sticky top-0 bg-black-pearl-900 ${
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
          <p className="hidden text-xl text-black-pearl-100 xs:block">
            RuneFinder
          </p>
        </Link>
      </div>
      <div className="navbar-end gap-1">
        {user ? (
          <>
            {!!data?.group_id && (
              <NavLink
                to={`/group/${data.group_id}`}
                className={({ isActive }) =>
                  `btn btn-ghost font-extrabold hover:bg-black-pearl-800 ${
                    isActive ? 'text-anzac-400' : ''
                  }`
                }
              >
                <UsersIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
                My group
              </NavLink>
            )}
            {shouldShowDivider && (
              <div className="divider divider-horizontal p-2" />
            )}
            <NavLink
              to={`/player/${user.id}`}
              className={({ isActive }) =>
                `btn btn-ghost w-12 p-0 hover:bg-black-pearl-800 ${
                  isActive ? 'text-anzac-400' : ''
                }`
              }
            >
              <UserIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `btn btn-ghost w-12 p-0 hover:bg-black-pearl-800 ${
                  isActive ? 'text-anzac-400' : ''
                }`
              }
            >
              <Cog6ToothIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
            </NavLink>
          </>
        ) : (
          <>
            <button
              className="btn btn-ghost font-bold hover:bg-black-pearl-800"
              onClick={() => navigate('?signin')}
            >
              Sign in
            </button>
            <button
              className="btn bg-anzac-400 font-bold text-black-pearl-900 hover:bg-anzac-300"
              onClick={() => navigate('?signup')}
            >
              Sign up
            </button>
          </>
        )}
        <button className="btn btn-ghost w-12 p-0 hover:bg-black-pearl-800">
          <QuestionMarkCircleIcon className="h-6 w-6 [&>path]:stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default Header;
