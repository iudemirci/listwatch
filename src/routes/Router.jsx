import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { lazy } from "react";
import ScrollToTop from "../components/ScrollToTop.jsx";

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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="/" element={<Navigate replace to={"home"} />} />
          <Route path="home" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="films" element={<Films />} />
          <Route path="films/:id" element={<FilmDetailsPage />} />
          <Route path="person/:id" element={<PersonDetailsPage />} />
          <Route path="tv/:id" element={<TvDetailsPage />} />
          <Route path="lists" element={<Lists />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
