import { Link } from "react-router-dom";
import Paragraph from "../ui/Paragraph";
import Button from "../ui/Button";
import { createPortal } from "react-dom";

function NoMatch() {
  return createPortal(
    <div className="absolute top-1/2 left-1/2 w-full -translate-1/2 p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <Paragraph type="secondary" className="mb-6 text-lg">
        Oops! The page you're looking for doesn’t exist.
      </Paragraph>
      <Link to="/">
        <Button type="secondary" size="big_wide">
          Go back to Homepage
        </Button>
      </Link>
    </div>,
    document.body,
  );
}

export default NoMatch;
