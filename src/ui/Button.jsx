import { twMerge } from "tailwind-merge";
import { cn } from "../utilities/cn";

function Button({
  children,
  type = "primary",
  size = "default",
  className,
  ...props
}) {
  const types = {
    primary: `active:translate-y-0.5 border-primary bg-primary cursor-pointer rounded-lg border-2 text-sm duration-300 lg:text-base transition-all hover:bg-primary-dark hover:border-primary-dark shadow`,
    secondary: `cursor-pointer rounded-lg border-1 border-primary text-sm duration-300 hover:border-text-default hover:text-inherit font-bold lg:text-base text-primary active:translate-y-0.5 shadow`,
  };

  const sizes = {
    default: "px-2 py-0.5",
    default_wide: "px-4 py-0.5",
    big: "px-2 py-1",
    big_wide: "px-4 py-1",
  };

  return (
    <button
      className={cn(`${types[type]} ${sizes[size]}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
