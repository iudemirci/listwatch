import { memo } from "react";
import { cn } from "../utilities/cn";

function textStyle(type = "primary") {
  switch (type) {
    case "primary":
      return "text-xs lg:text-sm font-semibold ";
    case "secondary":
      return "text-xs lg:text-sm font-semibold  text-grey-primary ";
    case "tertiary":
      return "text-xs lg:text-sm font-semibold text-grey-primary-light ";
    default:
      return "text-xs lg:text-sm font-semibold";
  }
}

function Paragraph({ children, type, className, ...props }) {
  return (
    <p className={cn(textStyle(type), className)} {...props}>
      {children}
    </p>
  );
}

export default memo(Paragraph);
