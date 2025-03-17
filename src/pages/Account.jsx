import Title from "../ui/Title";
import AccountList from "../components/account/accountList";
import { getLists, getUsername } from "../components/user/userSlice";
import { useSelector } from "react-redux";

function Account() {
  const lists = useSelector(getLists);
  const [name] = useSelector(getUsername);

  return (
    <div className="flex flex-col items-start gap-8 py-4">
      <Title level={2}>Hello, {name}</Title>
      <section className="flex flex-col gap-4">
        {lists.map((list) => (
          <AccountList list={list} />
        ))}
      </section>
    </div>
  );
}

export default Account;
