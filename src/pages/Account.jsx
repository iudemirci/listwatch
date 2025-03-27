import Title from "../ui/Title";
import ListTabs from "../components/account/ListTabs";
import AccountPoster from "../components/account/AccountPoster";

import useDocumentTitle from "../hooks/useDocumentTitle";

function Account() {
  useDocumentTitle("Account | list&watch", false);

  return (
    <div className="flex flex-col gap-8 py-4">
      <Title level={2}>Hello, Ihsan U.</Title>

      <section>
        <AccountPoster />
      </section>
      <section className="flex flex-col gap-4">
        <ListTabs />
      </section>
    </div>
  );
}

export default Account;
