import Icon from "@mdi/react";
import { mdiPlusBoxMultiple } from "@mdi/js";
import { useGetLists } from "../../hooks/lists/useGetLists";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import Title from "../../ui/Title";
import Paragraph from "../../ui/Paragraph";
import NewListPopup from "../NewListPopup";
import Skeleton from "../../ui/Skeleton";
import AccountList from "./AccountList";

function ListTabs() {
  const [isPopup, setIsPopup] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  const { data: lists, isPending: isListsPending, isFetched } = useGetLists();

  useEffect(() => {
    if (!isListsPending) setCurrentList(lists[0]);
  }, [lists, isListsPending]);

  function handlePopup() {
    setIsPopup((s) => !s);

    if (document.body.style.overflow === "hidden")
      return (document.body.style.overflow = "auto");
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Title level={3}>My Lists</Title>
        <Icon
          path={mdiPlusBoxMultiple}
          size={0.9}
          className="text-grey-primary hover:text-primary cursor-pointer duration-300"
          onClick={() => handlePopup()}
        />
      </div>
      <ul className="flex flex-wrap gap-2">
        {!isFetched
          ? [...Array(2)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-8 rounded-3xl 2xl:h-10 ${i % 2 === 1 ? "w-40" : "w-30"}`}
              />
            ))
          : lists?.map((list) => (
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
        {isFetched && lists?.length === 0 && (
          <Paragraph
            type="secondary"
            className={"hover:text-primary cursor-pointer"}
            onClick={() => setIsPopup((s) => !s)}
          >
            Create your list now!
          </Paragraph>
        )}
      </ul>
      {currentList && (
        <AccountList currentList={currentList} handlePopup={handlePopup} />
      )}

      {isPopup && <NewListPopup handlePopup={handlePopup} />}
    </>
  );
}

export default ListTabs;
