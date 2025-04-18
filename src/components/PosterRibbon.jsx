import { useDispatch } from "react-redux";
import { openAddItemPopup, openSignupPopup } from "../store/popupSlice";
import { cn } from "../utilities/cn";

const sizes = {
  big: "h-8 w-7  lg:h-10 pb-2 lg:w-9 lg:text-2xl",
  small: "h-8 w-7 lg:text-lg",
};

function PosterRibbon({ size, poster, item, className }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      dispatch(openSignupPopup());
    }
    if (token && item) {
      dispatch(openAddItemPopup(item));
    }
  }

  if (poster)
    return (
      <div
        className={cn(
          `bg-grey-secondary/70 hover:bg-grey-secondary/90 hover:text-primary shadow-grey-primary absolute -top-0.5 left-0 z-20 flex cursor-pointer items-center justify-center font-bold text-white/70 shadow-lg duration-300`,
          sizes[size],
          className,
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
        }}
        onClick={handleClick}
      >
        +
      </div>
    );
  else
    return (
      <div
        className={cn(
          `bg-grey-secondary shadow-grey-primary z-2 flex items-center justify-center font-bold text-white shadow-lg`,
          sizes[size],
          className,
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
        }}
      >
        +
      </div>
    );
}

export default PosterRibbon;
