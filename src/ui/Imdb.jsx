function Imdb({ id, type = "title" }) {
  const link = type === "person" ? "name" : "title";

  return (
    <a
      href={`https://www.imdb.com/${link}/${id}`}
      target="/"
      className="imdb text-grey-primary hover:text-primary duration-300"
    ></a>
  );
}

export default Imdb;
