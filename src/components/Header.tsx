import { useAuth } from '@contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user } = useAuth();
  const [top, setTop] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <div
      className={`navbar bg-black-pearl-900 sticky top-0 ${
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
            className="object-contain h-8 w-8"
          />
          <p className="hidden xs:block text-xl text-black-pearl-100">
            RuneFinder
          </p>
        </Link>
      </div>
      <div className="navbar-end gap-1">
        {user ? (
          <Link
            to="/account"
            className="btn btn-ghost w-12 p-0 hover:bg-black-pearl-800"
          >
            <UserIcon className="w-6 h-6 [&>path]:stroke-[2.5]" />
          </Link>
        ) : (
          <>
            <button
              className="btn btn-ghost font-bold hover:bg-black-pearl-800"
              onClick={() => navigate('?signin')}
            >
              Sign in
            </button>
            <button
              className="btn bg-anzac-400 text-black-pearl-900 font-bold hover:bg-anzac-300"
              onClick={() => navigate('?signup')}
            >
              Sign up
            </button>
          </>
        )}
        <button className="btn btn-ghost w-12 p-0 hover:bg-black-pearl-800">
          <QuestionMarkCircleIcon className="w-6 h-6 [&>path]:stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default Header;
