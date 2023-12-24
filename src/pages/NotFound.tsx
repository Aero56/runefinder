const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-128px)] items-center justify-center sm:h-[calc(100vh-64px)]">
      <div className="flex flex-col gap-3 p-4 text-center">
        <h1 className="text-4xl font-bold text-anzac-400 sm:text-6xl">Oops!</h1>
        <p className="text-xl sm:text-2xl">This page could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
