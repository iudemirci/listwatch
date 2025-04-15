import { useGetUser } from "./hooks/auth/useGetUser.js";
import { useGetLists } from "./hooks/lists/useGetLists.js";
import { useGetFavouriteItems } from "./hooks/user/useGetFavouriteItems.js";
import { useGetLikes } from "./hooks/user/useGetLikes.js";
import Router from "./routes/Router.jsx";

function App() {
  useGetUser();
  useGetLists();
  useGetLikes();
  useGetFavouriteItems();

  return <Router />;
}

export default App;
