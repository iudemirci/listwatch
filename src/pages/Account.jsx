import Title from "../ui/Title";
import FavouriteContent from "../components/account/FavouriteContent";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useGetUser } from "../hooks/auth/useGetUser";
import { useGetLists } from "../hooks/lists/useGetLists";
import Section from "../components/homepage/Section";
import PosterList from "../components/shared/PosterList";
import Watchlist from "../components/homepage/Watchlist";
import LastVisited from "../components/shared/LastVisited";
import LikesList from "../components/account/LikesList";
import { useGetFavouriteItems } from "../hooks/user/useGetFavouriteItems";
import HomePoster from "../components/homepage/HomePoster";
import { useGetLikes } from "../hooks/user/useGetLikes";
import AddItemPopover from "../components/popover/AddItemPopover";
import EmptyCustomLists from "../components/account/EmptyCustomLists";
import ScrollToTopButton from "../ui/ScrollToTopButton";

function Account() {
  const token = localStorage.getItem("token");

  const { user } = useGetUser();
  const username = user?.user_metadata?.username || "";
  useDocumentTitle("Account | list&watch", false);

  const { data: userLists, isPending: isListsPending } = useGetLists();
  const watchlist = userLists?.find((list) => list.listName === "Watchlist");
  const customLists = userLists?.filter(
    (list) => list.listName !== "Watchlist",
  );
  const { favouriteItems, isPending: isFavouritePending } =
    useGetFavouriteItems();
  const { data: likes, isPending: isLikesPending } = useGetLikes();

  return (
    <div className="mt-[16rem] flex flex-col gap-8 pt-12">
      <HomePoster movies={favouriteItems} short={true} />
      <AddItemPopover />
      <ScrollToTopButton />

      <Title level={2}>Hello, {username}</Title>

      <Section title="Favourite Items" mount={true}>
        <FavouriteContent
          favouriteItems={favouriteItems}
          isPending={isFavouritePending}
        />
      </Section>

      <Section
        title="From your Watchlist"
        mount={true}
        linkID={`/lists/app/${watchlist?.id}`}
      >
        {token ? (
          watchlist?.items?.length > 0 ? (
            <PosterList
              movies={watchlist?.items.slice(0, 20)}
              watchlist={true}
              isPending={false}
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

      {customLists?.length > 0 ? (
        customLists?.map((list) =>
          list?.items?.length > 0 ? (
            <Section
              key={list?.id}
              title={list?.listName}
              mount={true}
              linkID={`/lists/app/${list?.id}`}
            >
              <PosterList
                movies={list?.items?.slice(0, 20)}
                isPending={isListsPending}
                watchlist={true}
              />
            </Section>
          ) : (
            <Section
              key={list?.id}
              title={list?.listName}
              mount={true}
              linkID={`/lists/app/${list?.id}`}
            >
              <EmptyCustomLists existing={list?.listName} />
            </Section>
          ),
        )
      ) : (
        <Section title={"Custom Lists"} mount={true}>
          <EmptyCustomLists />
        </Section>
      )}

      <LastVisited />
    </div>
  );
}

export default Account;
