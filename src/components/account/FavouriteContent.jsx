import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiShareAll, mdiImageOff } from "@mdi/js";

import Title from "../../ui/Title";
import Skeleton from "../../ui/Skeleton";

import { cn } from "../../utilities/cn";
import { useGetFavouriteItem } from "../../hooks/user/useGetFavouriteItem";
import { useGetUser } from "../../hooks/auth/useGetUser";

function FavouriteContent() {
  const { user } = useGetUser();
  const id = user?.id;
  // const { favouriteItem, isPending, isFetched } = useGetFavouriteItem(id);

  return (
    <div className="flex flex-col gap-2 2xl:gap-4">
      <Title level={4}>Favourite Content</Title>
      <div className="flex w-full gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border-grey-primary/50 group bg-grey-secondary hover:border-text-default aspect-2/3 flex-1 cursor-pointer rounded-lg border-1 duration-300"
          >
            <Link
              to="/discover"
              className="flex size-full items-center justify-center"
            >
              <Icon
                path={mdiPlusBoxOutline}
                size={1}
                className="text-grey-primary/50 group-hover:text-text-default duration-300"
              />
            </Link>
          </div>
        ))}
        {/* <div className="group absolute inset-0 flex items-center justify-center before:absolute before:inset-0"></div> */}
      </div>
    </div>
  );
}

export default FavouriteContent;
