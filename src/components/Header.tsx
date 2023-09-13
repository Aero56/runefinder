import { useAuth } from '@contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user } = useAuth();
  const [top, setTop] = useState(true);

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
          className="btn btn-ghost normal-case text-xl text-anzac-400 hover:bg-black-pearl-800"
        >
          RuneFinder
        </Link>
      </div>
      <div className="navbar-end gap-1">
        <button className="btn btn-ghost btn-circle hover:bg-black-pearl-800">
          <QuestionMarkCircleIcon className="w-5 h-5 [&>path]:stroke-[3]" />
        </button>
        {user ? (
          <Link
            to="/account"
            className="btn btn-ghost btn-circle hover:bg-black-pearl-800"
          >
            <UserIcon className="w-5 h-5 [&>path]:stroke-[3]" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn bg-anzac-400 text-black-pearl-900 font-extrabold rounded-full w-28 hover:bg-anzac-300"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
