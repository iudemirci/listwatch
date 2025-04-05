import Icon from "@mdi/react";
import { twMerge } from "tailwind-merge";

function MdiIcon({ onClick, size = 1.1, path, className }) {
  return (
    <Icon
      path={path}
      size={size}
      className={twMerge(
        `text-grey-primary-light hover:text-primary group-hover:text-primary cursor-pointer duration-300`,
        className,
      )}
      onClick={onClick}
    />
  );
}

export default MdiIcon;
