import { Image } from "antd";
import { cn } from "../utilities/cn";
import Icon from "@mdi/react";
import { mdiImageOff } from "@mdi/js";

export default function Poster({ path, preview = false, className }) {
  // const posterPath = path ||

  if (!path)
    return (
      <div className="border-grey-secondary flex aspect-2/3 items-center justify-center rounded-lg border-2">
        <Icon path={mdiImageOff} size={2} className="text-grey-primary" />
      </div>
    );

  if (preview)
    return (
      <Image
        src={`https://image.tmdb.org/t/p/w780${path}`}
        className="aspect-[2/3] rounded-lg"
      />
    );

  return (
    <img
      src={`https://image.tmdb.org/t/p/w342${path}`}
      className={cn("pointer-events-none aspect-[2/3] rounded-lg", className)}
      alt="movie poster"
    />
  );
}
