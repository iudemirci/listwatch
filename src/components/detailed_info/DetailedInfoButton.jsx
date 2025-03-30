import { twMerge } from "tailwind-merge";

function DetailedInfoButton({ children, className, ...props }) {
  return (
    <span
      className={twMerge(
        "text-grey-primary-light bg-grey-secondary hover:text-text-default cursor-pointer rounded-sm px-1.5 py-[3px] text-xs duration-100 lg:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default DetailedInfoButton;
