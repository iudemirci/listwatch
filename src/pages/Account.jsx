import Title from "../ui/Title";
import AccountList from "../components/account/accountList";
import { getLists, getUsername } from "../components/user/userSlice";
import { useSelector } from "react-redux";

function Account() {
  const lists = useSelector(getLists);
  const username = useSelector(getUsername);

  return (
    <div className="flex flex-col gap-8 py-4">
      <Title level={2}>Hello, {username}</Title>
      <section className="flex flex-col gap-4">
        {lists.map((list) => (
          <AccountList key={list.list_id} list={list} />
        ))}
      </section>
    </div>
  );
}

export default Account;
