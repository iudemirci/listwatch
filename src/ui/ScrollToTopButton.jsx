import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronUp } from "@mdi/js";

function ScrollToTopButton({ threshold = 1600 }) {
  const [visible, setVisible] = useState(false);

  // listen to scrollY
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={scrollToTop}
      className={`bg-primary border-grey-primary-light hover:bg-primary-dark fixed top-5 left-1/2 z-100 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-xl py-0.5 pr-3 pl-2 text-sm duration-300 active:-translate-y-0.5 ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-label="Scroll to top"
    >
      <Icon path={mdiChevronUp} size={1} />
      Back to top
    </button>
  );
}

export default React.memo(ScrollToTopButton);
