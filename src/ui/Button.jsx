import { twMerge } from "tailwind-merge";

function Button({ children, type = "primary", className, ...props }) {
  const types = {
    primary: `border-primary bg-primary cursor-pointer rounded-2xl border-2 px-2 py-1 text-[14px] duration-300 hover:border-2 hover:bg-transparent lg:text-base 2xl:px-2 2xl:text-lg`,
    secondary: `border-primary cursor-pointer rounded-2xl border-2 px-2 py-1 text-[14px] duration-300 hover:border-2 hover:bg-primary hover:text-inherit lg:text-base 2xl:px-2 2xl:text-lg text-grey-primary bg-background-default`,
  };

  return (
    <button className={twMerge(types[type], className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
