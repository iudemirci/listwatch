import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiNotificationClearAll } from "@mdi/js";

import Title from "../../ui/Title";
import AccountIcon from "../AccountIcon";
import Paragraph from "../../ui/Paragraph";

function ListCard({ list, homepage = false }) {
  const { id, listName, items, username } = list;
  const posterPaths = items?.map((item) => item?.poster_path);
  while (posterPaths.length < 5) {
    posterPaths.push(null);
  }
  return (
    <li key={id} className="mt-4 flex w-full flex-col gap-2">
      <div className="hover:shadow-outline w-full overflow-hidden rounded-md duration-300 hover:shadow-[0_0_0_2px_var(--color-primary)]">
        <Link to={`/lists/app/${id}`} className="flex items-center">
          {posterPaths.map((item, index) => {
            if (!item) {
              return (
                <div
                  key={index}
                  className="border-grey-secondary bg-grey-tertiary aspect-2/3 min-w-0 flex-1 rounded-md border-2"
                  style={{
                    marginLeft: index === 0 ? "0" : "-25%",
                    zIndex: items?.length - index,
                    boxShadow: "4px 4px 20px rgba(0, 0, 0, 1)",
                  }}
                />
              );
            }

            if (item) {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w185${item}`}
                  alt={item.title}
                  className="border-grey-secondary aspect-[2/3] min-w-0 flex-1 rounded-md border-2 object-cover"
                  style={{
                    marginLeft: index === 0 ? "0" : "-25%",
                    zIndex: items?.length - index,
                    boxShadow: "4px 4px 20px rgba(0, 0, 0, 1)",
                  }}
                />
              );
            }
          })}
        </Link>
      </div>

      <Link to={`/lists/app/${id}`} className="inline-block">
        <Title
          level={4}
          className={`hover:text-primary font-bold duration-100 ${homepage && "line-clamp-2"}`}
        >
          {listName}
        </Title>
      </Link>

      <div className="flex items-center gap-1">
        <AccountIcon path={null} className="size-5" />
        <Paragraph type="tertiary" className="cursor-pointer hover:underline">
          {username}
        </Paragraph>

        <div className="flex items-center">
          <Icon
            path={mdiNotificationClearAll}
            size={0.9}
            className="text-grey-primary"
          />
          <Paragraph
            type="tertiary"
            className="hover:text-text-default cursor-pointer duration-100"
          >
            {items?.length} items
          </Paragraph>
        </div>
      </div>
    </li>
  );
}

export default ListCard;
