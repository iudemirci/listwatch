import { twMerge } from "tailwind-merge";

function InputField({ label, error, isPending, className, ...props }) {
  return (
    <label className={`text-grey-primary-light flex flex-col gap-1 text-xs`}>
      <div className="flex justify-between">
        {label} <span className="text-text-default">{error}</span>
      </div>
      <input
        className={twMerge(
          `text-background-default bg-text-default rounded-lg px-2 py-1.5 text-sm opacity-50 duration-300 focus:opacity-100 ${isPending && "animate-pulse"}`,
          className,
        )}
        disabled={isPending}
        {...props}
      />
    </label>
  );
}

export default InputField;
