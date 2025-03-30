import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ScrollToTop from "../components/ScrollToTop.jsx";

const AppLayout = lazy(() => import("./../ui/AppLayout.jsx"));
const Homepage = lazy(() => import("./../pages/Homepage"));
const Account = lazy(() => import("./../pages/Account.jsx"));
const Discover = lazy(() => import("./../pages/Discover.jsx"));
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
          <Route path="discover" element={<Discover />} />
          <Route path="/movie/:id/:name" element={<FilmDetailsPage />} />
          <Route path="/tv/:id/:name" element={<TvDetailsPage />} />
          <Route path="/person/:id/:name" element={<PersonDetailsPage />} />
          <Route path="lists" element={<Lists />} />
          <Route path="news" element={<News />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
