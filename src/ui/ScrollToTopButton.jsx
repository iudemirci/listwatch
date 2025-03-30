import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowUpBold } from "@mdi/js";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  // listen to scrollY
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setVisible(true);
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
      className={`bg-primary border-grey-primary-light fixed right-5 bottom-5 z-100 flex size-11 cursor-pointer items-center justify-center rounded-full border-2 duration-300 active:-translate-y-0.5 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-label="Scroll to top"
    >
      <Icon path={mdiArrowUpBold} size={1} />
    </button>
  );
}

export default ScrollToTopButton;
