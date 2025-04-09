import { useParams } from "react-router-dom";
import { concat, groupBy, intersectionBy, join, map, uniq } from "lodash";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import Skeleton from "../../ui/Skeleton";

import { getYear } from "../../utilities/getYear";
import { useSearchData } from "../../hooks/moviedb/useSearchData";
import KnownForItem from "./KnownForItem";
import Paragraph from "../../ui/Paragraph";

function KnownForList({ name, credits, isCreditsPending }) {
  const { id } = useParams("id");
  const isScreenBig = useMediaQuery({
    query: "(min-width: 1440px)",
  });
  const mergedCredits = groupBy(concat(credits?.crew, credits?.cast), "id");
  const finalCredits = map(mergedCredits, (items) => {
    const characters = uniq(map(items, "character")).filter(
      (char) => char !== undefined,
    );
    const jobs = uniq(map(items, "job")).filter((job) => job !== undefined);

    return {
      id: items[0]?.id,
      title: items[0]?.title || items[0]?.name,
      credit: join(concat(characters, jobs), " / "),
      year:
        getYear(items[0]?.release_date || items[0]?.first_air_date) ||
        "UPCOMING",
      rating: items[0]?.vote_average?.toFixed(1) || null,
      type: items[0]?.media_type === "tv" ? "Tv Show" : "Movie",
      poster: items[0]?.poster_path,
    };
  });

  //known for data
  const { data: searchPerson, isPending: isSearchPending } = useSearchData(
    name,
    {
      enabled: !!name,
    },
  );
  const knownFor =
    searchPerson?.results?.find((p) => p.id === +id)?.known_for || [];

  const matchingCredits = intersectionBy(finalCredits, knownFor, "id");

  return isScreenBig ? (
    <div className="grid gap-2 md:grid-cols-2 2xl:grid-cols-3">
      {isCreditsPending || isSearchPending
        ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-27.5" />)
        : matchingCredits?.map((item) => (
            <SwiperSlide key={item?.id}>
              <KnownForItem item={item} />
            </SwiperSlide>
          ))}
    </div>
  ) : (
    <div className="group relative">
      <Swiper
        modules={[FreeMode, Mousewheel, Navigation]}
        spaceBetween={16}
        freeMode={true}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        speed={400}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        slidesPerView={"auto"}
        navigation={{
          nextEl: `.swiper-next-${id}`,
        }}
        className="w-full"
      >
        {isCreditsPending || isSearchPending
          ? [...Array(3)].map((_, i) => (
              <SwiperSlide
                key={i}
                className="!w-[85%] snap-center sm:!w-[80%] lg:!w-[55%]"
              >
                <Skeleton className="h-23 lg:h-27.5" />
              </SwiperSlide>
            ))
          : matchingCredits?.map((item) => (
              <SwiperSlide
                key={item?.id}
                className="!w-[85%] snap-center sm:!w-[80%] lg:!w-[55%]"
              >
                <KnownForItem item={item} />
              </SwiperSlide>
            ))}
      </Swiper>

      <button
        className={`swiper-next-${id} bg-background-default hover:bg-primary border-primary 2xl:py-3} absolute top-[50%] right-0 z-20 block translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-[12px] opacity-50 duration-300 group-hover:opacity-100 2xl:px-1.5`}
      >
        <Paragraph>&rarr;</Paragraph>
      </button>
    </div>
  );
}

export default KnownForList;
