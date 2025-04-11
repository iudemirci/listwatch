import { cn } from "../utilities/cn";

const colors = {
  white: "text-text-default",
  grey: "text-grey-primary-light",
};

function Title({ level, type, children, className, ...props }) {
  if (level === 1)
    return (
      <h1
        className={cn(
          `align-center flex text-2xl font-extrabold 2xl:text-2xl ${colors[type]}`,
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
          `text-3xl leading-6 font-extrabold lg:text-4xl lg:leading-8 2xl:text-5xl 2xl:leading-10 ${colors[type]}`,
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
          `text-base font-semibold tracking-wide uppercase lg:text-lg ${colors[type]}`,
          className,
        )}
        {...props}
      >
        <span className="bg-primary mr-1 rounded-sm px-0.5"></span>
        {children}
      </h3>
    );

  if (level === 4)
    return (
      <h4
        className={cn(
          `align-center flex leading-4.5 font-semibold md:text-base lg:text-xl 2xl:pr-2 2xl:text-xl ${colors[type]}`,
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
          `text-grey-primary-light text-sm font-medium tracking-wider uppercase lg:text-base ${colors[type]}`,
          className,
        )}
        {...props}
      >
        {children}
      </h5>
    );
  if (level === 6)
    return (
      <h6
        className={cn(
          `text-sm font-medium lg:text-base ${colors[type]}`,
          className,
        )}
        {...props}
      >
        {children}
      </h6>
    );
  if (level === 7)
    return (
      <h6
        className={cn(
          `text-[11px] font-bold tracking-widest uppercase lg:text-xs ${colors[type]}`,
          className,
        )}
        {...props}
      >
        {children}
      </h6>
    );
}

export default Title;
