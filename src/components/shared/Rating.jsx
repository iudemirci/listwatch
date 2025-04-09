import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "../../ui/Title";
import { twMerge } from "tailwind-merge";

function Rating({ rating, className }) {
  if (!rating) return null;

  return (
    <div className={twMerge("flex items-center", className)}>
      <Icon path={mdiStar} size={0.7} className="text-primary" />
      <Title level={4}>{rating?.toFixed(1) / 2}</Title>
      <Title level={5} className="-ml-1.5">
        /5
      </Title>
    </div>
  );
}

export default Rating;
