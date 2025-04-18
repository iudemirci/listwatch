import { useDispatch } from "react-redux";
import { mdiFormatAlignJustify, mdiTableLarge } from "@mdi/js";
import Icon from "@mdi/react";

import ListCustomSort from "./ListCustomSort";
import Skeleton from "../../ui/Skeleton";

import { openListDeletePopup } from "../../store/popupSlice";

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
  setIsEdit,
  isEdit,
  isUser,
}) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(openListDeletePopup());
  }

  return (
    <div className="border-grey-primary/50 flex items-center justify-between border-y-1 py-1">
      {isPending ? (
        <Skeleton className="h-5 w-20" />
      ) : (
        <p className="text-grey-primary text-sm">
          {(item?.total_results ?? item?.length) === 0 ? (
            "No items"
          ) : (
            <>
              {item?.total_results ?? item?.length} item
              {(item?.total_results ?? item?.length) > 1 && "s"}
            </>
          )}
        </p>
      )}
      <div className="flex gap-2">
        {item?.total_results && (
          <ListCustomSort setOptions={setOptions} options={options} />
        )}
        {isUser && (
          <>
            <button
              className={`cursor-pointer self-center rounded-sm border px-3 py-0.5 text-sm duration-300 ${isEdit ? "bg-primary hover:bg-primary-dark border-text-default" : "bg-grey-secondary hover:border-primary border-grey-primary/50 hover:text-primary"}`}
              onClick={() => setIsEdit((e) => !e)}
            >
              Edit
            </button>
            <button
              className={`bg-grey-secondary hover:border-primary border-grey-primary/50 hover:text-primary"} hover:text-primary cursor-pointer self-center rounded-sm border px-3 py-0.5 text-sm duration-300`}
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
        <div className="flex gap-0.5">
          {display.map((icon, idx) => (
            <div
              key={idx}
              className={`hover:bg-grey-secondary cursor-pointer rounded-sm p-0.5 duration-300 ${selectedDisplay === idx && "text-primary"}`}
              onClick={() => {
                setSelectedDisplay(idx);
              }}
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
