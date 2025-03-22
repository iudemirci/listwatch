import { Image } from "antd";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";

function ImageGrid({ images }) {
  const backdropImages = images.backdrops
    .slice(0, 6)
    .map((image) => image.file_path);

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Images</Title>
      <ul className="grid grid-cols-3 gap-1 gap-x-3">
        <Image.PreviewGroup>
          {!backdropImages.length && (
            <Paragraph type="primary">No images found</Paragraph>
          )}
          {backdropImages.map((image, i) => {
            let colSpanClass = "rounded-lg overflow-hidden";

            if (backdropImages.length === 1) colSpanClass += " col-span-full";
            else if (i % 4 === 0) colSpanClass += " col-span-2 row-span-2";
            else colSpanClass += " col-span-1";

            return (
              <li key={i} className={colSpanClass}>
                <Image src={`https://image.tmdb.org/t/p/w780${image}`} />
              </li>
            );
          })}
        </Image.PreviewGroup>
      </ul>
    </div>
  );
}

export default ImageGrid;
