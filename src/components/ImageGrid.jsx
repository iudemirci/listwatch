import { Image } from "antd";
import Title from "../ui/Title";

function ImageGrid({ images }) {
  const backdropImages = images.backdrops
    .slice(0, 6)
    .map((image) => image.file_path);

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Photos</Title>
      <ul className="grid grid-cols-3 grid-rows-4 gap-1 gap-x-3">
        <Image.PreviewGroup>
          {backdropImages.map((image, i) => (
            <li
              key={i}
              className="overflow-hidden rounded-lg first:col-span-2 first:row-span-2 last:col-start-2 last:col-end-4 last:row-start-3 last:row-end-5"
            >
              <Image src={`https://image.tmdb.org/t/p/w780${image}`} />
            </li>
          ))}
        </Image.PreviewGroup>
      </ul>
    </div>
  );
}

export default ImageGrid;
