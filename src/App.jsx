import { useGetUser } from "./hooks/auth/useGetUser.js";
import { useGetLists } from "./hooks/lists/useGetLists.js";
import { useGetLikes } from "./hooks/user/useGetLikes.js";
import Router from "./routes/Router.jsx";

function App() {
  useGetUser();
  useGetLists();
  useGetLikes();

  return <Router />;
}

export default App;
