import Paragraph from "../../ui/Paragraph";
import PosterList from "./PosterList";
import Title from "../../ui/Title";

import { useDispatch, useSelector } from "react-redux";
import { clearLastVisited } from "../../store/lastVisitedSlice";

function LastVisited() {
  const dispatch = useDispatch();
  const lastVisited = useSelector((state) => state.LastVisited);

  return (
    <section className="full-width-component flex min-w-full items-center justify-center overflow-x-hidden bg-black/70">
      <div className="w-sm px-4 sm:w-lg md:w-xl lg:w-3xl 2xl:w-5xl">
        <div className="flex items-center justify-between">
          <Title level={3}>Last visited</Title>

          {lastVisited.length > 0 && (
            <button
              onClick={() => dispatch(clearLastVisited())}
              className="text-primary cursor-pointer text-xs hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        {lastVisited?.length > 0 ? (
          <PosterList movies={lastVisited} lastVisited={true} />
        ) : (
          <Paragraph type="tertiary" className="mt-4">
            You have no recently viewed pages
          </Paragraph>
        )}
      </div>
    </section>
  );
}

export default LastVisited;
