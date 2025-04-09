import { mdiArrowExpandAll } from "@mdi/js";
import MdiIcon from "../ui/MdiIcon";
import { memo } from "react";

function ImageHoverMask() {
  return (
    <div className="bg-background-default/80 border-primary pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-full -translate-1/2 items-center justify-center rounded-lg border-2 opacity-0 duration-300 group-hover:opacity-100">
      <MdiIcon path={mdiArrowExpandAll} size={1} className="text-primary" />
    </div>
  );
}

export default memo(ImageHoverMask);
