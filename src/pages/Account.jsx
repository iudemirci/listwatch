import Title from "../ui/Title";
import ListTabs from "../components/account/ListTabs";
import { useSelector } from "react-redux";
import HomePoster from "../components/HomePoster";
import AccountPoster from "../components/account/AccountPoster";
import { useGetFavouriteItem } from "../hooks/user/useGetFavouriteItem";

function Account() {
  const { favouriteItem, isPending: isFavouritePending } =
    useGetFavouriteItem();

  return (
    <div className="flex flex-col gap-8 py-4">
      <Title level={2}>Hello, Ihsan U.</Title>

      <section className="flex flex-col gap-4">
        <ListTabs />
      </section>

      {!isFavouritePending && (
        <section>
          <AccountPoster favouriteItem={favouriteItem} />
        </section>
      )}
    </div>
  );
}

export default Account;
