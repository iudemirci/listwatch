import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

const AppLayout = lazy(() => import("./../pages/AppLayout.jsx"));
const Homepage = lazy(() => import("./../pages/Homepage"));
const Account = lazy(() => import("./../pages/Account.jsx"));
const Films = lazy(() => import("./../pages/Films.jsx"));
const Lists = lazy(() => import("./../pages/Lists.jsx"));
const News = lazy(() => import("./../pages/News.jsx"));
const Login = lazy(() => import("./../pages/Login.jsx"));
const FilmDetailsPage = lazy(() => import("./../pages/FilmDetailsPage.jsx"));
const PersonDetailsPage = lazy(
  () => import("./../pages/PersonDetailsPage.jsx"),
);
const TvDetailsPage = lazy(() => import("./../pages/TvDetailsPage.jsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute.jsx"));

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
