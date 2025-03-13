import { twMerge } from "tailwind-merge";

function Button({ children, className, ...props }) {
  return (
    <button
      className={twMerge(
        `border-primary bg-primary cursor-pointer rounded-2xl border-2 px-2 py-1 text-[14px] duration-300 hover:border-2 hover:bg-transparent lg:text-base 2xl:px-2 2xl:text-lg`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
