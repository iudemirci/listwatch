import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { twMerge } from "tailwind-merge";

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
        `bg-grey-secondary flex aspect-square size-9 max-h-fit cursor-pointer items-center justify-center rounded-full`,
        className,
      )}
    >
      <Icon path={mdiAccount} size={1} />
    </div>
  );
}

export default AccountIcon;
