import { Image } from "antd";
import Title from "../../ui/Title";

function PersonImageGrid() {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Photos</Title>
      <ul className="grid grid-cols-3 grid-rows-4 gap-1 gap-x-3 lg:grid-cols-6 lg:grid-rows-1">
        <Image.PreviewGroup>
          <li className="col-span-2 row-span-2 lg:col-span-1">
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/vo5x9GRs2vT47LNb1HZvKUEsk8C.jpg"}`}
              className="aspect-auto"
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/pNGSSLVVvpjlECk3L20S9HV1FkK.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/8fous3wrp1mVwSbyQKmUy0Fepn5.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/tEHNLdwPmxu3Ikkvq8I6FUfGdZL.jpg"}`}
            />
          </li>
          <li className="col-start-2 col-end-4 row-start-3 row-end-5 lg:col-start-6 lg:col-end-6 lg:row-start-1">
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/qouCh22I7LZtEJ2THaDsSv0W0ma.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/jQioYo29rT6HEmQcdZujdfJ7oZs.jpg"}`}
            />
          </li>
        </Image.PreviewGroup>
      </ul>
    </div>
  );
}

export default PersonImageGrid;
