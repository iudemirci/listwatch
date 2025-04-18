import { Link } from "react-router-dom";
import Paragraph from "../../ui/Paragraph";
import Button from "../../ui/Button";
import PosterRibbon from "../PosterRibbon";

function EmptyCustomLists({ existing = false }) {
  return (
    <div className="flex w-full flex-col items-center pt-8 text-center">
      <PosterRibbon size="big" />
      <Paragraph type="primary" className="mt-2 font-extrabold">
        {existing ? `Start adding items to ${existing}` : "Create custom lists"}
      </Paragraph>
      <Paragraph type="tertiary">
        {existing
          ? "Add items and keep track."
          : "Create your list and add items"}
      </Paragraph>
      <Link to="/discover" className="mt-6">
        <Button type="secondary" size="default_wide">
          Discover
        </Button>
      </Link>
    </div>
  );
}

export default EmptyCustomLists;
