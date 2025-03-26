import ReactReadMoreReadLess from "react-read-more-read-less";

function ReadMore({
  children,
  limit = 1000,
  readMore = "Read more",
  readLess = "Read less",
}) {
  return (
    <ReactReadMoreReadLess
      charLimit={limit}
      readMoreText={
        <span className="hover:text-primary text-grey-primary-light duration-300">
          {readMore}
        </span>
      }
      readLessText={
        <span className="hover:text-primary text-grey-primary-light duration-300">
          {readLess}
        </span>
      }
    >
      {children}
    </ReactReadMoreReadLess>
  );
}

export default ReadMore;
