import { useState } from "react";
import { mdiImageOff } from "@mdi/js";
import Icon from "@mdi/react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { cn } from "../utilities/cn";
import Skeleton from "../ui/Skeleton";
import Paragraph from "../ui/Paragraph";

export default function Poster({
  path,
  preview = false,
  title,
  year,
  className,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!path)
    return (
      <div
        className={cn(
          "border-grey-secondary bg-background-default relative flex aspect-2/3 items-end justify-center rounded-lg border-2 text-center",
          className,
        )}
      >
        <Icon
          path={mdiImageOff}
          size={2}
          className="text-grey-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <Paragraph type="tertiary" className="pb-3">
          {title}({year})
        </Paragraph>
      </div>
    );

  if (preview)
    return (
      <div
        className={cn(
          "outline-grey-primary shadow-grey-secondary/20 aspect-2/3 overflow-hidden rounded-lg shadow-lg",
          className,
        )}
      >
        {!isLoaded && <Skeleton className={cn("aspect-2/3", className)} />}

        <PhotoProvider maskOpacity={0.9} bannerVisible={false}>
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
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
