import Icon from "@mdi/react";
import { mdiPlusBoxMultiple } from "@mdi/js";
import { useGetLists } from "../../hooks/lists/useGetLists";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import Title from "../../ui/Title";
import AccountList from "./accountList";
import Paragraph from "../../ui/Paragraph";
import NewListPopup from "../NewListPopup";
import { Spin } from "antd";

function ListTabs() {
  const [isPopup, setIsPopup] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  const { data: lists, isPending: isListsPending } = useGetLists();

  useEffect(() => {
    if (!isListsPending) setCurrentList(lists[0]);
  }, [lists, isListsPending]);

  if (isListsPending) return <Spin size="large" />;

  return (
    <>
      <div className="flex gap-2">
        <Title level={2}>My Lists</Title>
        <Icon
          path={mdiPlusBoxMultiple}
          size={1.2}
          className="text-grey-primary hover:text-primary cursor-pointer duration-300"
          onClick={() => setIsPopup((s) => !s)}
        />
      </div>
      <ul className="flex flex-wrap gap-2">
        {lists.map((list) => (
          <li key={list.id}>
            <Button
              type={
                currentList && currentList.id === list.id
                  ? "primary"
                  : "secondary"
              }
              onClick={() => setCurrentList(list)}
            >
              {list.listName}
            </Button>
          </li>
        ))}
        {lists && lists.length === 0 && (
          <Paragraph
            type="secondary"
            className={"hover:text-primary cursor-pointer"}
            onClick={() => setIsPopup((s) => !s)}
          >
            Create your list now!
          </Paragraph>
        )}
      </ul>
      {currentList && <AccountList currentList={currentList} />}

      {isPopup && <NewListPopup handlePopup={setIsPopup} />}
    </>
  );
}

export default ListTabs;
