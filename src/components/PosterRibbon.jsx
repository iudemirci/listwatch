function PosterRibbon({ size }) {
  const sizes = {
    big: "h-8 w-7  lg:h-12 lg:w-9 lg:text-2xl",
    small: "h-8 w-7 lg:text-lg",
  };

  return (
    <div
      className={`bg-grey-secondary/70 hover:bg-grey-secondary/90 hover:text-primary shadow-grey-primary absolute top-0 left-0 z-2 flex cursor-pointer items-center justify-center font-bold text-white shadow-lg duration-300 ${sizes[size]}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
      }}
    >
      +
    </div>
  );
}

export default PosterRibbon;
