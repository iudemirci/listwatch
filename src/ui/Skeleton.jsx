import { twMerge } from "tailwind-merge";

function Skeleton({ className, children }) {
  return (
    <div
      className={twMerge(
        `bg-grey-secondary z-1 h-full w-full animate-pulse rounded-l`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Skeleton;
