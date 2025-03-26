import { mdiListBox, mdiFolderPlus } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/Button";

function ListButton({ children, type, ...props }) {
  const iconType = type === "list" ? mdiListBox : mdiFolderPlus;
  const buttonType = type === "list" ? "secondary" : "primary";

  return (
    <Button
      type={buttonType}
      className={"text-text-default flex w-fit items-center gap-1 py-0.5"}
      {...props}
    >
      <Icon path={iconType} size={0.8} />
      {children}
    </Button>
  );
}

export default ListButton;
