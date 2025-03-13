import { cn } from "../hooks/cn";

function Flex({ children, className, ...props }) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export default Flex;
