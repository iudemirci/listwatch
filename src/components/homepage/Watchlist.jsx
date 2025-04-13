import { Link } from "react-router-dom";

import Paragraph from "../../ui/Paragraph";
import Button from "../../ui/Button";
import PosterRibbon from "../PosterRibbon";

function Watchlist({ logged }) {
  return (
    <div className="flex w-full flex-col items-center pt-8 text-center">
      <PosterRibbon size="big" />
      <Paragraph type="primary" className="mt-2 font-extrabold">
        {logged
          ? "Start adding items to you Watchlist"
          : "Sign in to access your Watchlist"}
      </Paragraph>
      <Paragraph type="tertiary">
        Save shows and movies to keep track of what you want to watch.
      </Paragraph>
      {logged ? (
        <Link to="/discover">
          <Button className="mt-6" type="secondary" size="default_wide">
            Discover
          </Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button className="mt-6" type="secondary" size="default_wide">
            Sign in
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Watchlist;
