import { twMerge } from "tailwind-merge";

function Button({ children, type = "primary", className, ...props }) {
  const types = {
    primary: `active:translate-y-0.5 border-primary bg-primary cursor-pointer rounded-2xl border-2 px-2 py-1 text-sm duration-300 lg:text-base 2xl:px-2 2xl:text-lg transition-all `,
    secondary: `border-primary cursor-pointer rounded-2xl border-2 px-2 py-1 text-[14px] duration-300 hover:border-2 hover:bg-primary hover:text-inherit lg:text-base 2xl:px-2 2xl:text-lg text-grey-primary bg-background-default active:translate-y-0.5`,
  };

  return (
    <button className={twMerge(types[type], className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
