function MainContainer({ children }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-sm px-4 sm:w-lg md:w-xl lg:w-3xl 2xl:w-5xl">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
