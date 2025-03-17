import { Image } from "antd";
import { cn } from "../utilities/cn";

export default function Poster({ path, preview = false, className }) {
  if (preview)
    return (
      <Image
        src={`https://image.tmdb.org/t/p/original${path}`}
        className="aspect-[2/3] rounded-lg"
      />
    );

  return (
    <img
      src={`https://image.tmdb.org/t/p/w342${path}`}
      className={cn(
        "pointer-events-none aspect-[2/3] rounded-lg object-cover",
        className,
      )}
      alt="movie poster"
    />
  );
}
