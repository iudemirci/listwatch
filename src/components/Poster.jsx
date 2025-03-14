import { Image } from "antd";
import { cn } from "../utilities/cn";

export default function Poster({ path, preview = false, className }) {
  if (preview)
    return (
      <Image
        src={`https://image.tmdb.org/t/p/original${path}`}
        className="border-grey-secondary border-1"
      />
    );

  return (
    <img
      src={`https://image.tmdb.org/t/p/w342${path}`}
      className={cn("pointer-events-none aspect-[2/3] object-cover", className)}
    />
  );
}
