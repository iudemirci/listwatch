import { Swiper } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import Paragraph from "./Paragraph";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function PrevArrow({ className }) {
  return (
    <button
      className={twMerge(
        `bg-background-default hover:bg-primary border-primary absolute top-[50%] left-0 z-20 block translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-sm opacity-0 duration-300 group-hover:opacity-100`,
        className,
      )}
    >
      <Paragraph>&larr;</Paragraph>
    </button>
  );
}

export function NextArrow({ className }) {
  return (
    <button
      className={twMerge(
        `bg-background-default hover:bg-primary border-primary absolute top-[50%] right-0 z-20 block translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-[12px] opacity-50 duration-300 group-hover:opacity-100 2xl:px-1.5 2xl:py-3`,
        className,
      )}
    >
      <Paragraph>&rarr;</Paragraph>
    </button>
  );
}

function CustomSwiper({
  perItem = 3,
  ItemToSlide = 2,
  maxItem = 6,
  space = 5,
  loop = false,
  children,
  ...props
}) {
  const id = Math.floor(Math.random() * 100000);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(perItem);

  const handleSlideChange = (swiper) => {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  };

  const updateSlidesPerView = () => {
    if (window.innerWidth >= 1440) {
      setSlidesPerView(maxItem);
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(perItem + 2);
    } else if (window.innerWidth >= 640) {
      setSlidesPerView(perItem + 1);
    } else {
      setSlidesPerView(perItem);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, [perItem, maxItem]);

  useEffect(() => {
    const totalItems = React.Children.count(children);
    if (totalItems <= slidesPerView) {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  }, [children, slidesPerView]);

  return (
    <div className="group relative">
      <Swiper
        direction="horizontal"
        className="overflow-hidden rounded-lg"
        spaceBetween={space}
        modules={[Autoplay, Mousewheel, Navigation, FreeMode]}
        onSlideChange={handleSlideChange}
        navigation={{
          prevEl: `.swiper-prev-${id}`,
          nextEl: `.swiper-next-${id}`,
        }}
        slidesPerView={perItem}
        slidesPerGroup={ItemToSlide}
        freeMode={true}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        speed={400}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: false,
        }}
        loop={loop}
        breakpoints={{
          640: {
            slidesPerView: perItem + 1,
          },
          768: {
            slidesPerView: perItem + 1,
            slidesPerGroup: perItem + 1,
          },
          1024: {
            slidesPerView: perItem + 2,
          },
          1440: {
            slidesPerView: maxItem,
          },
        }}
        {...props}
      >
        {children}
      </Swiper>

      {showButtons ? (
        <>
          <PrevArrow
            className={`swiper-prev-${id} ${atStart ? "!opacity-0" : ""}`}
          />
          <NextArrow
            className={`swiper-next-${id} ${atEnd ? "!opacity-0" : ""}`}
          />
        </>
      ) : null}
    </div>
  );
}

export default CustomSwiper;
