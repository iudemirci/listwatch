import Title from "../ui/Title";
import ListTabs from "../components/account/ListTabs";

function Account() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <Title level={2}>Hello, Ihsan U.</Title>
      <section className="flex flex-col gap-4">
        <ListTabs />
      </section>
    </div>
  );
}

export default Account;
