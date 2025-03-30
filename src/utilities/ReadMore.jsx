import React, { useState } from "react";

const ReadMoreLess = ({ children, charLimit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isContentLong = children.length > charLimit;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? children : children.slice(0, charLimit);

  return (
    <>
      {displayText}
      {isContentLong && (
        <button
          onClick={handleToggle}
          className="text-grey-primary-light hover:text-primary ml-2 inline-block cursor-pointer duration-300"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </>
  );
};

export default ReadMoreLess;
