import { twMerge } from "tailwind-merge";

function Input({ className, ...props }) {
  return (
    <input
      className={twMerge(
        "text-background-default bg-text-default rounded-lg px-2 py-1.5 text-sm opacity-50 duration-300 focus:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

export default Input;
