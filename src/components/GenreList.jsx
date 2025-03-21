function GenreList({ genres }) {
  return (
    <ul className="flex flex-wrap gap-1 lg:gap-1.5">
      {genres?.map((genre) => (
        <li key={genre}>
          <span className="2xl: border-primary hover:bg-primary cursor-pointer rounded-2xl border-1 px-1.5 py-0.5 text-xs duration-300 md:px-1.5 lg:py-1">
            {genre}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
