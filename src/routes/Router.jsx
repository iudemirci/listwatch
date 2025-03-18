import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./../pages/AppLayout.jsx";
import Homepage from "./../pages/Homepage";
import Account from "./../pages/Account";
import Films from "./../pages/Films";
import Lists from "./../pages/Lists";
import News from "./../pages/News";
import Login from "./../pages/Login.jsx";
import FilmDetailsPage from "./../pages/FilmDetailsPage.jsx";
import PersonDetailsPage from "./../pages/PersonDetailsPage.jsx";
import TvDetailsPage from "./../pages/TvDetailsPage.jsx";
import ProtectedRoute from "./protectedRoute.jsx";

function Router() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "account",
              element: <Account />,
            },
          ],
        },
        {
          path: "/",
          element: <Navigate replace to={"home"} />,
        },
        {
          path: "home",
          element: <Homepage />,
        },
        {
          path: "login",
          element: <Login />,
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

  return <RouterProvider router={router} />;
}

export default Router;
