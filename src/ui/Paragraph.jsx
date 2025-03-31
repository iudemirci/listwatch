import { cn } from "../utilities/cn";

function Paragraph({ children, type, className, ...props }) {
  function textStyle(type) {
    switch (type) {
      case "primary":
        return "text-xs lg:text-sm font-semibold ";
      case "secondary":
        return "text-xs lg:text-sm font-semibold  text-grey-primary ";
      case "tertiary":
        return "text-xs lg:text-sm font-semibold text-grey-primary-light ";
    }
  }

  return (
    <p className={cn(textStyle(type), className)} {...props}>
      {children}
    </p>
  );
}

export default Paragraph;
