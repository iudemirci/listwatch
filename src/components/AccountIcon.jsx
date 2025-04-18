import { mdiAccount } from "@mdi/js";
import { twMerge } from "tailwind-merge";
import Icon from "@mdi/react";

function AccountIcon({ path, className }) {
  return path ? (
    <img
      src={`https://image.tmdb.org/t/p/w185${path}`}
      className={twMerge(
        `bg-grey-secondary aspect-square size-9 cursor-pointer rounded-full`,
        className,
      )}
    />
  ) : (
    <div
      className={twMerge(
        `bg-grey-secondary hover:outline-grey-primary flex aspect-square size-9 max-h-fit cursor-pointer items-center justify-center rounded-full outline outline-transparent duration-100`,
        className,
      )}
    >
      <Icon path={mdiAccount} size={1} />
    </div>
  );
}

export default AccountIcon;
