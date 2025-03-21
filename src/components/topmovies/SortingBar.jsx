import Title from "../../ui/Title";

function SortingBar({ setGenre, genres }) {
  return (
    <div className="flex items-center justify-between py-4">
      <Title level={3}>Movies</Title>
      <select
        className="rounded-2xl bg-zinc-800 p-1 px-1.5 text-xs font-semibold focus:outline-0"
        onChange={(e) => {
          setGenre(`&with_genres=${e.target.value}`);
        }}
      >
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortingBar;
