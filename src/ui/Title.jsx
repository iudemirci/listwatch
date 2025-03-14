import { cn } from "../utilities/cn";

function Title({ level, children, className, ...props }) {
  if (level === 1)
    return (
      <h1
        className={cn(
          "align-center flex text-xl font-extrabold 2xl:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );

  if (level === 2)
    return (
      <h2
        className={cn(
          "align-center flex text-3xl leading-6 font-extrabold sm:w-[350px] lg:w-[450px] 2xl:w-[500px] 2xl:text-4xl 2xl:leading-7",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  if (level === 3)
    return (
      <h3
        className={cn(
          "align-center flex text-lg leading-5 font-bold text-zinc-500 sm:text-base md:text-lg lg:text-xl 2xl:text-2xl",
          className,
        )}
        {...props}
      >
        <span className="bg-primary mr-1 rounded-2xl pr-1"></span>
        {children}
      </h3>
    );

  if (level === 4)
    return (
      <h4
        className={cn(
          "text-xbase align-center flex font-semibold md:text-base lg:text-xl 2xl:pr-2 2xl:text-xl",
          className,
        )}
        {...props}
      >
        {children}
      </h4>
    );

  if (level === 5)
    return (
      <h5
        className={cn(
          "align-center text-grey-primary flex text-base font-semibold md:text-base lg:text-xl 2xl:text-xl",
          className,
        )}
        {...props}
      >
        {children}
      </h5>
    );
}

export default Title;
