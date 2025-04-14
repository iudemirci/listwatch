import Title from "../ui/Title";
import FavouriteContent from "../components/account/FavouriteContent";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useGetUser } from "../hooks/auth/useGetUser";
import { useGetLists } from "../hooks/lists/useGetLists";
import { useGetListItems } from "../hooks/lists/useGetListItems";
import Section from "../components/homepage/Section";
import PosterList from "../components/shared/PosterList";
import Watchlist from "../components/homepage/Watchlist";

function Account() {
  const token = localStorage.getItem("token");

  const { user } = useGetUser();
  const username = user && user?.user_metadata?.username;
  useDocumentTitle("Account | list&watch", false);

  const { data: userLists } = useGetLists();
  const watchlist = userLists?.find((list) => list.listName === "Watchlist");
  const { data: watchlistItems } = useGetListItems(watchlist?.listID);

  return (
    <div className="flex flex-col gap-8 pt-12 pb-6">
      <Title level={2}>Hello, {username}</Title>

      <Section title="Favourite Items" mount={true}>
        <FavouriteContent />
      </Section>

      <Section title="From your Watchlist" mount={true}>
        {token ? (
          watchlistItems?.length > 0 ? (
            <PosterList movies={watchlistItems} watchlist={true} />
          ) : (
            <Watchlist logged={true} />
          )
        ) : (
          <Watchlist />
        )}
      </Section>
    </div>
  );
}

export default Account;
