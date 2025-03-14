function Imdb({ id, type }) {
  const link = type === "person" ? "name" : "title";

  return (
    <a
      href={`https://www.imdb.com/${link}/${id}`}
      target="/"
      className="imdb text-primary"
    ></a>
  );
}

export default Imdb;
