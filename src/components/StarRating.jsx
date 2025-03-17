import Icon from "@mdi/react";
import { mdiStar, mdiStarOutline } from "@mdi/js";
import { useState } from "react";

function StarRating({ size = 1.5, defaultRating = 0, onSetRating }) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);

    if (!onSetRating) return;
    onSetRating(rating);
  }

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onRate={() => handleRating(i + 1)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
        />
      ))}
    </div>
  );
}

function Star({ size, full, onHoverIn, onHoverOut, onRate }) {
  return (
    <span onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} onClick={onRate}>
      {full ? (
        <Icon
          path={mdiStar}
          size={size}
          className="text-primary cursor-pointer"
        />
      ) : (
        <Icon
          path={mdiStarOutline}
          size={size}
          className="text-primary cursor-pointer"
        />
      )}
    </span>
  );
}

export default StarRating;
