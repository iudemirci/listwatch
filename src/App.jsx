import { useGetUser } from "./hooks/auth/useGetUser.js";
import Router from "./routes/Router.jsx";

function App() {
  useGetUser();

  return <Router />;
}

export default App;
