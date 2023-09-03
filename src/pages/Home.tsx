import CloseButton from '@components/CloseButton';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl">RuneFinder</h1>
      <CloseButton
        onClick={() => {
          console.log('test');
        }}
      ></CloseButton>
    </div>
  );
};

export default Home;
