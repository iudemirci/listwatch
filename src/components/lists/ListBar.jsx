import { mdiFormatAlignJustify, mdiTableLarge } from "@mdi/js";
import Icon from "@mdi/react";
import ListCustomSort from "./ListCustomSort";

import Skeleton from "../../ui/Skeleton";

const display = [
  {
    path: mdiTableLarge,
  },
  {
    path: mdiFormatAlignJustify,
  },
];

function ListBar({
  options,
  setOptions,
  item,
  isPending,
  setSelectedDisplay,
  selectedDisplay,
}) {
  return (
    <div className="border-grey-primary/50 flex items-center justify-between border-y-1 py-1">
      {isPending ? (
        <Skeleton className="h-5 w-20" />
      ) : (
        <p className="text-grey-primary text-sm">
          {item?.total_results} results
        </p>
      )}
      <div className="flex gap-2">
        <ListCustomSort setOptions={setOptions} options={options} />
        <div className="flex gap-0.5">
          {display.map((icon, idx) => (
            <div
              key={idx}
              className={`hover:bg-grey-secondary cursor-pointer rounded-sm p-0.5 duration-300 ${selectedDisplay === idx && "text-primary"}`}
              onClick={() => setSelectedDisplay(idx)}
            >
              <Icon path={icon.path} size={1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListBar;
