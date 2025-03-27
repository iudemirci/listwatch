import { twMerge } from "tailwind-merge";

function Spinner({ className }) {
  return <div className={twMerge("spinner", className)}></div>;
}

export default Spinner;
