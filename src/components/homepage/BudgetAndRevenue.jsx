import { useQueries } from "@tanstack/react-query";
import Icon from "@mdi/react";
import { mdiCash } from "@mdi/js";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useMemo } from "react";

import Title from "../../ui/Title";
import LinkToId from "../../ui/LinkToId";
import Skeleton from "../../ui/Skeleton";

import formatCurrency from "../../utilities/formatCurrency";
import { getMovieItem } from "../../services/apiMoviedb";

function BudgetAndRevenue({ ids = [], isPending }) {
  const queries = useQueries({
    queries: ids?.map((id) => ({
      queryKey: ["movieDB", "movie", id, "item"],
      queryFn: () => getMovieItem("movie", id, "item"),
      enabled: !!id,
    })),
  });
  const isPendingAll = queries.some((query) => query.isPending) || isPending;

  const formattedData = useMemo(() => {
    const rawData = queries?.map((query) => {
      if (query.isSuccess) {
        return {
          id: query.data?.id,
          name: query.data?.title,
          budget: query.data?.budget,
          revenue: query.data?.revenue,
        };
      } else if (query.isError) {
        return {
          name: null,
          budget: null,
          revenue: null,
        };
      }
    });

    const sortedRawData = rawData?.sort((a, b) => b.revenue - a.revenue);

    return sortedRawData?.map((item) => ({
      ...item,
      revenue: formatCurrency(item?.revenue),
      budget: formatCurrency(item?.budget),
    }));
  }, [queries]);

  return (
    <ul className="border-grey-primary/50 overflow-hidden rounded-lg border-1">
      <div className="bg-grey-secondary flex items-center justify-between px-2 py-1">
        <Title level={5}> Revenues and Budgets</Title>
      </div>
      <div className="grid gap-y-3 px-2.5 py-3 md:grid-cols-2 md:gap-x-2 lg:gap-x-4 2xl:gap-x-8 2xl:gap-y-4 2xl:px-4 2xl:py-4">
        {isPendingAll
          ? [...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-9 2xl:h-10" />
            ))
          : formattedData?.map((item, i) => (
              <LinkToId key={i} item={item} type="movie">
                <li className="group flex cursor-pointer items-center">
                  <span className="w-2">{i + 1}</span>

                  <span className="bg-primary mx-2 rounded-sm py-2.5 pl-0.5" />

                  <div>
                    <Title
                      level={6}
                      className="line-clamp-1 font-semibold group-hover:underline"
                    >
                      {item?.name}
                    </Title>
                    <Title level={7} type="grey">
                      {item?.revenue === "$0" ? "N/A" : item?.revenue}
                    </Title>
                  </div>

                  <Popover className="relative ml-auto">
                    {({ open }) => (
                      <>
                        <PopoverButton className="hover:bg-grey-secondary flex size-8 cursor-pointer items-center justify-center rounded-md duration-300">
                          <Icon
                            path={mdiCash}
                            size={1.2}
                            className="text-grey-primary"
                          />
                        </PopoverButton>
                        <AnimatePresence mode="wait">
                          {open && (
                            <PopoverPanel
                              as={motion.div}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="bg-grey-secondary absolute top-0 left-0 z-2 -translate-x-[115%] rounded-md px-3 py-2 text-nowrap"
                              static
                            >
                              <div className="bg-grey-secondary absolute top-1/2 right-[-6px] h-3 w-3 -translate-y-1/2 rotate-45" />
                              <Title level={7} type="grey">
                                Budget:{" "}
                                {item?.budget === "$0" ? "N/A" : item?.budget}
                              </Title>
                            </PopoverPanel>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </Popover>
                </li>
              </LinkToId>
            ))}
      </div>
    </ul>
  );
}

export default memo(BudgetAndRevenue);
