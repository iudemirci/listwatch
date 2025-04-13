import Title from "../ui/Title";
import FavouriteContent from "../components/account/FavouriteContent";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useGetUser } from "../hooks/auth/useGetUser";

function Account() {
  const { user } = useGetUser();
  const username = user && user?.user_metadata?.username;
  useDocumentTitle("Account | list&watch", false);

  return (
    <div className="flex flex-col gap-8 py-4">
      <Title level={2}>Hello, {username}</Title>
      <FavouriteContent />
    </div>
  );
}

export default Account;
