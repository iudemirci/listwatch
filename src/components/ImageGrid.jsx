import { Image } from "antd";
import Title from "../ui/Title";

function ImageGrid() {
  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Photos</Title>
      <ul className="grid grid-cols-3 grid-rows-4 gap-1 gap-x-3">
        <Image.PreviewGroup>
          <li className="col-span-2 row-span-2">
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg"}`}
              className="aspect-auto"
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/wCuUKiRaz0wEESsYqmQy005xvTE.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/uG3m6jBwU8jUkt0jbUOj8Vb2Y11.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/uG3m6jBwU8jUkt0jbUOj8Vb2Y11.jpg"}`}
            />
          </li>
          <li className="col-start-2 col-end-4 row-start-3 row-end-5">
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/x6skktR5OS99lAX4JhmjCQYq490.jpg"}`}
            />
          </li>
          <li>
            <Image
              src={`https://image.tmdb.org/t/p/w780${"/xOXIXRH6F2CDeEPwVSBe6y2v25V.jpg"}`}
            />
          </li>
        </Image.PreviewGroup>
      </ul>
    </div>
  );
}

export default ImageGrid;
