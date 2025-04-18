import { cn } from "../hooks/cn";

function Paragraph({ children, type, className, ...props }) {
  function textStyle(type) {
    switch (type) {
      case "primary":
        return "text-xs md:text-4 font-semibold";
      case "secondary":
        return "text-xs md:text-5 font-semibold  text-grey-primary";
      case "tertiary":
        return "text-sm md:text-5 font-semibold";
    }
  }

  return (
    <p className={cn(textStyle(type), className)} {...props}>
      {children}
    </p>
  );
}

export default Paragraph;
