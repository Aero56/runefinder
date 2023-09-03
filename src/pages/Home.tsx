import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className="text-3xl">RuneFinder</h1>

      <Link to="/login">
        <p className="p-4 w-32 text-center bg-slate-600">Log in </p>
      </Link>
    </>
  );
};

export default Home;
