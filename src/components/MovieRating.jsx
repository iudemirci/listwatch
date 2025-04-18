import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Title from "./Title";

function MovieRating({ rating }) {
  return (
    <div className="flex items-center">
      <Icon path={mdiStar} size={0.7} className="text-primary" />
      <Title level={4}>{rating?.toFixed(2)}</Title>
      <Title level={5} className={"text-xs"}>
        /10
      </Title>
    </div>
  );
}

export default MovieRating;
