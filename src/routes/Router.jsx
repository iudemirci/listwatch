import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Signup from "../pages/Signup.jsx";
import ListDetails from "../components/lists/ListDetails.jsx";

const AppLayout = lazy(() => import("./../ui/AppLayout.jsx"));
const Homepage = lazy(() => import("./../pages/Homepage"));
const Account = lazy(() => import("./../pages/Account.jsx"));
const Discover = lazy(() => import("./../pages/Discover.jsx"));
const Lists = lazy(() => import("./../pages/Lists.jsx"));
const Login = lazy(() => import("./../pages/Login.jsx"));
const ContentDetailsPage = lazy(
  () => import("./../pages/ContentDetailsPage.jsx"),
);
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
          <Route path="/movie/:id/:name" element={<ContentDetailsPage />} />
          <Route path="/tv/:id/:name" element={<ContentDetailsPage />} />
          <Route path="/person/:id/:name" element={<PersonDetailsPage />} />
          <Route path="lists" element={<Lists />} />
          <Route path="lists/:id" element={<ListDetails />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
