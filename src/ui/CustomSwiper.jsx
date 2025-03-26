import { Swiper } from "swiper/react";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";

import "swiper/css/navigation";
import Paragraph from "./Paragraph";
import { useState } from "react";

function NextArrow() {
  return (
    <button className="bg-background-default hover:bg-primary border-primary absolute top-[50%] right-0 block translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-[12px] duration-300 2xl:px-1.5 2xl:py-3">
      <Paragraph>&rarr;</Paragraph>
    </button>
  );
}

function PrevArrow() {
  return (
    <button className="bg-background-default hover:bg-primary border-primary absolute top-[50%] left-0 z-1 block translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-sm duration-300">
      <Paragraph>&larr;</Paragraph>
    </button>
  );
}

function CustomSwiper({
  perItem = 3,
  ItemToSlide = 2,
  space = 5,
  delay = 5000,
  loop = false,
  children,
}) {
  const id = Math.floor(Math.random() * 100000);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  };

  return (
    <div className="group relative">
      <Swiper
        className="overflow-hidden rounded-lg"
        spaceBetween={space}
        modules={[Autoplay, Mousewheel, Navigation]}
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
          releaseOnEdges: true,
        }}
        autoplay={{
          pauseOnMouseEnter: true,
          delay: delay,
        }}
        loop={loop}
        breakpoints={{
          640: {
            slidesPerView: perItem + 1,
          },
          768: {
            slidesPerView: perItem + 2,
            slidesPerGroup: perItem + 1,
          },
          1024: {
            slidesPerView: perItem + 3,
          },
        }}
      >
        {children}
      </Swiper>
      <button
        className={`swiper-prev-${id} bg-background-default hover:bg-primary border-primary absolute top-[50%] left-0 z-20 block translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-sm opacity-0 duration-300 group-hover:opacity-100 ${atStart ? "!opacity-0" : ""}`}
      >
        <Paragraph>&larr;</Paragraph>
      </button>
      <button
        className={`swiper-next-${id} bg-background-default hover:bg-primary border-primary absolute top-[50%] right-0 z-20 block translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-lg border-2 px-1.5 py-2.5 text-[12px] opacity-50 duration-300 group-hover:opacity-100 2xl:px-1.5 2xl:py-3 ${atEnd ? "!opacity-0" : ""}`}
      >
        <Paragraph>&rarr;</Paragraph>
      </button>
    </div>
  );
}

export default CustomSwiper;
