import { useState } from "react";
import { mdiImageOff } from "@mdi/js";
import Icon from "@mdi/react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { cn } from "../utilities/cn";
import Skeleton from "../ui/Skeleton";

export default function Poster({ path, preview = false, className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!path)
    return (
      <div
        className={cn(
          "border-grey-secondary bg-background-default flex aspect-2/3 items-center justify-center rounded-lg border-2",
          className,
        )}
      >
        <Icon path={mdiImageOff} size={2} className="text-grey-primary" />
      </div>
    );

  if (preview)
    return (
      <div className={cn("aspect-2/3 overflow-hidden rounded-lg", className)}>
        {!isLoaded && <Skeleton className={cn("aspect-2/3", className)} />}

        <PhotoProvider bannerVisible={false} maskOpacity={0.9}>
          <PhotoView src={`https://image.tmdb.org/t/p/w780${path}`}>
            <img
              src={`https://image.tmdb.org/t/p/w780${path}`}
              className={`cursor-pointer transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoaded(true)}
            />
          </PhotoView>
        </PhotoProvider>
      </div>
    );

  return (
    <div
      className={cn(
        "pointer-events-none aspect-2/3 overflow-hidden rounded-lg",
        className,
      )}
    >
      {!isLoaded && <Skeleton className={"aspect-2/3"} />}

      <img
        src={`https://image.tmdb.org/t/p/w342${path}`}
        className={`rounded-lg transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        alt="movie poster"
        {...props}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
