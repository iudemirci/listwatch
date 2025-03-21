import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiShareAll } from "@mdi/js";
import { useSelector } from "react-redux";

import Title from "../../ui/Title";
import { cn } from "../../utilities/cn";
import { Link } from "react-router-dom";

function AccountPoster({ favouriteItem }) {
  const favMovie = favouriteItem?.at(0)?.favouriteItem;
  const isFav = favMovie ? "before:bg-black/30" : "before:bg-transparent";

  return (
    <div className="flex flex-col gap-2">
      <Title level={3}>Favourite Content</Title>
      <div className="outline-grey-secondary hover:outline-primary relative h-35 w-full overflow-hidden rounded-xl outline-2 duration-300">
        <div
          className={cn(
            "group absolute inset-0 before:absolute before:inset-0",
            isFav,
          )}
          style={{
            background: `url(https://image.tmdb.org/t/p/w1280${favMovie?.backdrop_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {favMovie?.backdrop_path && (
            <Link
              to={`/films/${favMovie.id}`}
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Icon path={mdiShareAll} size={1.3} className="text-primary" />
            </Link>
          )}

          {!favMovie?.backdrop_path && (
            <Link
              to={"/films"}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <Icon
                path={mdiPlusBoxOutline}
                size={1.3}
                className="text-grey-primary group-hover:text-primary duration-300"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPoster;
