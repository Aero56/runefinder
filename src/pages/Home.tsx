import { Link } from 'react-router-dom';

import Footer from 'components/Footer';
import NewsAndUpdates from 'components/NewsAndUpdates';
import TopPlayers from 'components/TopPlayers';

const Home = () => {
  return (
    <>
      <div className="mb-12 flex flex-col gap-3">
        <div className="relative flex h-[480px] flex-col items-center justify-center gap-4 p-4">
          <img
            src="/images/background.webp"
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black-pearl-950" />
          <h1 className="z-10 text-4xl font-bold text-anzac-400 sm:text-6xl">
            RuneFinder
          </h1>
          <p className="z-10 max-w-2xl text-center text-lg font-medium sm:text-xl">
            Always playing RuneScape alone and having trouble finding people to
            play with? RuneFinder is here to bring people together!
          </p>
          <Link to="groups" className="btn btn-primary btn-sm z-10">
            Find a group
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 lg:flex-row">
          <NewsAndUpdates />
          <TopPlayers />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
