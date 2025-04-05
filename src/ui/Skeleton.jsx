import { twMerge } from "tailwind-merge";

function Skeleton({ className, children }) {
  return (
    <div
      className={twMerge(
        `bg-grey-secondary z-1 size-full animate-pulse rounded-lg`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Skeleton;
