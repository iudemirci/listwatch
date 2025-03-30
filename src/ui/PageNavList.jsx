import { NavLink } from "react-router-dom";
import {
  mdiMovieOutline,
  mdiMenu,
  mdiAccountBox,
  mdiAccountBoxPlusOutline,
  mdiLogin,
  mdiLogout,
  mdiNewspaperVariantOutline,
  mdiListBoxOutline,
  mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import MdiIcon from "./MdiIcon";
import Spinner from "./Spinner";

import { useLogout } from "../hooks/auth/useLogout";
import { openLoginPopup, openSignupPopup } from "../store/popupSlice";

function PageNavList() {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const token = localStorage.getItem("token");

  const { logout, isPending: isLogoutPending } = useLogout();

  const navItems = () => [
    {
      label: token && "Account",
      path: token && "/account",
      icon: token && <Icon path={mdiAccountBox} size={1} />,
    },
    {
      label: "Discover",
      path: "/discover",
      icon: <Icon path={mdiMovieOutline} size={1} />,
    },
    {
      label: "lists",
      path: "/lists",
      icon: <Icon path={mdiListBoxOutline} size={1} />,
    },
    {
      label: "News",
      path: "/news",
      icon: <Icon path={mdiNewspaperVariantOutline} size={1} />,
    },
  ];

  function toggleDrawer() {
    setIsClicked((prevState) => !prevState);
  }

  function handleLoginClick(e) {
    if (e.button === 0) {
      e.preventDefault();
      dispatch(openLoginPopup());
    }
  }

  function handleSignupClick(e) {
    if (e.button === 0 || e.button === 1) {
      e.preventDefault();
      dispatch(openSignupPopup());
    }
  }

  return (
    <>
      {/* pc nav */}
      <nav className="hidden opacity-100 lg:block">
        <ul className="text-text-default/90 flex items-center gap-2.5 text-xs font-extrabold tracking-wider uppercase 2xl:gap-4 2xl:text-sm">
          {!token && (
            <>
              <li
                className="cursor-pointer duration-300 hover:text-white"
                onMouseDown={handleLoginClick}
              >
                <NavLink to={"/login"} onClick={(e) => e.preventDefault()}>
                  Sign in
                </NavLink>
              </li>
              <li
                className="cursor-pointer duration-300 hover:text-white"
                onMouseDown={handleSignupClick}
              >
                Create account
              </li>
            </>
          )}

          {navItems().map((item) => {
            if (item.label === null) return null;
            return (
              <li key={item.path} className="duration-300 hover:text-white">
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            );
          })}
          {/* logout pc */}
          {token &&
            (isLogoutPending ? (
              <Spinner />
            ) : (
              <li className="hover:text-primary cursor-pointer pl-1.5 duration-300">
                <Icon
                  path={mdiLogout}
                  size={1}
                  onClick={() => {
                    logout();
                  }}
                />
              </li>
            ))}
        </ul>
      </nav>
      <Icon
        path={mdiMenu}
        size={1.5}
        onClick={toggleDrawer}
        className="hover:text-primary cursor-pointer duration-300 lg:hidden"
      />

      {/* mobile nav */}
      <AnimatePresence>
        {isClicked && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background-default/60 fixed inset-0 z-50 lg:hidden"
              aria-hidden="true"
              onClick={toggleDrawer}
            />

            <motion.nav
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "circInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-grey-tertiary text-grey-primary-light border-grey-primary/30 absolute top-0 left-0 z-60 w-full rounded-b-xl border-x-1 border-b-1 pt-4 pb-2 lg:hidden"
            >
              <span className="absolute top-3 right-3">
                <MdiIcon onClick={() => setIsClicked(false)} path={mdiClose} />
              </span>
              <ul className="divide-grey-primary size-full divide-y-1 px-2 text-sm font-extrabold uppercase">
                <>
                  {!token && (
                    <>
                      <li className="cursor-pointer duration-300 hover:text-white">
                        <NavLink to={"/login"} onClick={toggleDrawer}>
                          <span
                            className={
                              "hover:text-text-default flex items-center gap-1 py-1 duration-300"
                            }
                          >
                            <span>
                              <Icon path={mdiLogin} size={1} />
                            </span>
                            Sign in
                          </span>
                        </NavLink>
                      </li>
                      <li
                        className="flex cursor-pointer items-center gap-1 py-1 duration-300 hover:text-white"
                        onClick={() => {
                          toggleDrawer();
                          dispatch(openSignupPopup());
                        }}
                      >
                        <Icon path={mdiAccountBoxPlusOutline} size={1} />
                        Create Account
                      </li>
                    </>
                  )}
                  {navItems().map((item) => {
                    if (item.label === null) return null;

                    return (
                      <li key={item.path} className="py-1">
                        <NavLink to={item.path} onClick={toggleDrawer}>
                          <span
                            className={
                              "hover:text-text-default flex items-center gap-1 duration-300"
                            }
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </>

                {/* logout mobile */}
                {token && (
                  <li
                    className="hover:text-primary flex cursor-pointer items-center gap-1 py-1 duration-300"
                    onClick={() => {
                      logout("", {
                        onSuccess: () => toggleDrawer(),
                      });
                    }}
                  >
                    <span className="text-grey-primary">
                      <Icon path={mdiLogout} size={1} />
                    </span>
                    Log out {isLogoutPending && <Spinner />}
                  </li>
                )}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default PageNavList;
