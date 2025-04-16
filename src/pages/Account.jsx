import Title from "../ui/Title";
import FavouriteContent from "../components/account/FavouriteContent";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useGetUser } from "../hooks/auth/useGetUser";
import { useGetLists } from "../hooks/lists/useGetLists";
import { useGetListItems } from "../hooks/lists/useGetListItems";
import Section from "../components/homepage/Section";
import PosterList from "../components/shared/PosterList";
import Watchlist from "../components/homepage/Watchlist";
import LastVisited from "../components/shared/LastVisited";
import LikesList from "../components/account/LikesList";
import { useGetFavouriteItems } from "../hooks/user/useGetFavouriteItems";
import HomePoster from "../components/homepage/HomePoster";
import { useGetLikes } from "../hooks/user/useGetLikes";

function Account() {
  const token = localStorage.getItem("token");

  const { user } = useGetUser();
  const username = user && user?.user_metadata?.username;
  useDocumentTitle("Account | list&watch", false);

  const { data: userLists, isPending: isListsPending } = useGetLists();
  const watchlist = userLists?.find((list) => list.listName === "Watchlist");
  const { data: watchlistItems, isPending: isWatchlistPending } =
    useGetListItems(watchlist?.listID);

  const { favouriteItems, isPending: isFavouritePending } =
    useGetFavouriteItems();

  const { data: likes, isPending: isLikesPending } = useGetLikes();

  return (
    <div className="mt-[16rem] flex flex-col gap-8 pt-12">
      <HomePoster movies={favouriteItems} short={true} />
      <Title level={2}>Hello, {username}</Title>

      <Section title="Favourite Items" mount={true}>
        <FavouriteContent
          favouriteItems={favouriteItems}
          isPending={isFavouritePending}
        />
      </Section>

      <Section title="From your Watchlist" mount={true}>
        {token ? (
          watchlistItems?.length > 0 ? (
            <PosterList
              movies={watchlistItems}
              watchlist={true}
              isPending={isWatchlistPending || isLikesPending}
            />
          ) : (
            <Watchlist logged={true} />
          )
        ) : (
          <Watchlist />
        )}
      </Section>

      <Section title="Likes" mount={true}>
        <LikesList likes={likes} isLikesPending={isLikesPending} />
      </Section>

      <LastVisited />
    </div>
  );
}

export default Account;
