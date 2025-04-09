import { useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

import Paragraph from "../../ui/Paragraph";

import { useMovieDB } from "../../hooks/moviedb/useMovieDB";
import { Icon } from "@iconify/react/dist/iconify.js";
import Skeleton from "../../ui/Skeleton";

function MoreAtLinks() {
  const { id } = useParams("id");
  const location = useLocation();
  const type = useMemo(
    () => location.pathname.split("/")[1],
    [location.pathname],
  );

  const { data: externalIDs, isPending: isIDsPending } = useMovieDB(
    type,
    id,
    "external_ids",
  );

  const icons = useMemo(() => {
    return [
      {
        text: "IMDB",
        name: "imdb_id",
        icon: "la:imdb",
        base: `https://www.imdb.com/${type === "person" ? "name" : "title"}/`,
        id: externalIDs?.imdb_id,
      },
      {
        text: "TMDB",
        name: "tmdb_id",
        icon: "la:tmdb",
        base: `https://www.themoviedb.org/${type}/`,
        id: id,
      },
      {
        name: "wikidata_id",
        icon: "simple-icons:wikidata",
        base: "https://www.wikidata.org/wiki/",
        id: externalIDs?.wikidata_id,
      },
      {
        name: "instagram_id",
        icon: "qlementine-icons:instagram-16",
        base: "https://www.instagram.com/",
        id: externalIDs?.instagram_id,
      },
      {
        name: "facebook_id",
        icon: "qlementine-icons:facebook-16",
        base: "https://www.facebook.com/",
        id: externalIDs?.facebook_id,
      },
      {
        name: "twitter_id",
        icon: "qlementine-icons:twitter-16",
        base: "https://twitter.com/",
        id: externalIDs?.twitter_id,
      },
    ];
  }, [type, externalIDs, id]);

  return (
    <div className="flex items-center gap-1 text-nowrap">
      <Paragraph type="tertiary" className="flex items-center gap-1">
        More at
      </Paragraph>
      {isIDsPending ? (
        <Skeleton />
      ) : (
        icons?.map((icon) => {
          if (!icon?.id) return null;
          if (icon?.text)
            return (
              <a
                key={icon?.name}
                className="border-grey-primary/50 text-grey-primary-light hover:border-grey-primary-light cursor-pointer rounded-xs border-2 px-1 py-0.5 text-[10px] duration-100"
                href={`${icon?.base}${icon?.id}`}
                target="_blank"
              >
                {icon?.text}
              </a>
            );

          return (
            <a
              key={icon?.name}
              className="cursor-pointer"
              href={`${icon?.base}${icon?.id}`}
              target="_blank"
            >
              <Icon
                icon={icon.icon}
                fontSize={icon?.name === "wikidata_id" ? 25 : 20}
                className="hover:text-text-default text-grey-primary-light duration-100"
              />
            </a>
          );
        })
      )}
    </div>
  );
}

export default MoreAtLinks;
