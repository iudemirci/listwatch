import Masonry from "react-masonry-css";

import Section from "../components/homepage/Section";
import ListsTitle from "../components/lists/ListsTitle";
import LastVisited from "../components/shared/LastVisited";
import AddItemPopover from "../components/popover/AddItemPopover";
import Skeleton from "../ui/Skeleton";
import ScrollToTopButton from "../ui/ScrollToTopButton";
import ListCard from "../components/lists/ListCard";

import { useGetLists } from "../hooks/lists/useGetLists";
import TopLoadingBar from "../ui/TopLoadingBar";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

function Lists() {
  const { data: lists, isPending } = useGetLists(true);
  console.log(isPending);
  return (
    <div className="mt-12 flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-10 2xl:gap-y-12">
      <AddItemPopover />
      <ScrollToTopButton />
      <TopLoadingBar isLoading={isPending} />

      <ListsTitle />

      <Section title="Most recent lists">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid md:gap-2"
          columnClassName="my-masonry-grid_column"
        >
          {isPending
            ? [...Array(12)].map((_, idx) => (
                <Skeleton key={idx} className="mt-4 h-65 w-full lg:mt-4" />
              ))
            : lists?.map((list) => <ListCard key={list?.id} list={list} />)}
        </Masonry>
      </Section>
      <LastVisited />
    </div>
  );
}

export default Lists;
