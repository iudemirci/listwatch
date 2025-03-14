import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import Films from "./pages/Films";
import Lists from "./pages/Lists";
import News from "./pages/News";
import { MoviesProvider } from "./contexts/MoviesContext.jsx";
import FilmDetailsPage from "./pages/FilmDetailsPage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PersonDetailsPage from "./pages/PersonDetailsPage.jsx";
import TvDetailsPage from "./pages/TvDetailsPage.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to={"home"} />,
      },
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "films",
        element: <Films />,
      },
      {
        path: "films/:id",
        element: <FilmDetailsPage />,
      },
      {
        path: "person/:id",
        element: <PersonDetailsPage />,
      },
      {
        path: "tv/:id",
        element: <TvDetailsPage />,
      },
      {
        path: "lists",
        element: <Lists />,
      },
      {
        path: "news",
        element: <News />,
      },
    ],
  },
]);

function App() {
  return (
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  );
}

export default App;
