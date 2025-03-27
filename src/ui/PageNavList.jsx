import { NavLink, useNavigate } from "react-router-dom";
import {
  mdiBackburger,
  mdiFilmstripBox,
  mdiMenu,
  mdiAccountBox,
  mdiLogin,
  mdiLogout,
  mdiNewspaper,
  mdiListBox,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

function PageNavList({ setIsOpen }) {
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkRef = useRef(null);

  const navItems = () => [
    {
      label: token && "Account",
      path: token && "/account",
      icon: token && <Icon path={mdiAccountBox} size={1.2} />,
    },
    {
      label: "Discover",
      path: "/discover",
      icon: <Icon path={mdiFilmstripBox} size={1.2} />,
    },
    {
      label: "lists",
      path: "/lists",
      icon: <Icon path={mdiListBox} size={1.2} />,
    },
    {
      label: "News",
      path: "/news",
      icon: <Icon path={mdiNewspaper} size={1.2} />,
    },
  ];

  function toggleDrawer() {
    setIsClicked((prevState) => !prevState);
  }

  function handleLoginClick(e) {
    if (e.button === 0) {
      e.preventDefault();
      setIsOpen(true);
    }

    if (e.button === 1) {
      e.preventDefault();
      if (linkRef.current) linkRef.current.click();
    }
  }

  return (
    <>
      {/* pc nav */}
      <nav className="hidden opacity-100 md:block">
        <ul className="flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase 2xl:gap-4 2xl:text-sm">
          {!token && (
            <li
              onMouseDown={handleLoginClick}
              className="cursor-pointer duration-300 hover:text-white"
            >
              <NavLink to={"/login"}>Sign in</NavLink>
            </li>
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
          {token && (
            <li className="hover:text-primary cursor-pointer duration-300">
              <Icon
                path={mdiLogout}
                size={1}
                onClick={() => {
                  dispatch(removeToken());
                  queryClient.removeQueries(["lists"]);
                  navigate("/");
                }}
              />
            </li>
          )}
        </ul>
      </nav>
      <Icon
        path={mdiMenu}
        size={1.5}
        onClick={toggleDrawer}
        className="hover:text-primary cursor-pointer duration-300 md:hidden"
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
              className="bg-background-default/60 fixed inset-0 z-50"
              aria-hidden="true"
              onClick={toggleDrawer}
            />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background-default border-grey-primary fixed inset-y-0 right-0 z-60 flex w-45 flex-col items-center gap-2 border-l-1 py-4"
            >
              <Icon
                path={mdiBackburger}
                className="hover:text-primary cursor-pointer duration-300"
                size={1.6}
                onClick={() => setIsClicked(false)}
              />
              <ul className="flex h-full flex-col items-center justify-between text-sm font-extrabold uppercase lg:text-[9px] 2xl:gap-4 2xl:text-xs">
                <div className="flex flex-col gap-2">
                  {!token && (
                    <li className="cursor-pointer duration-300 hover:text-white">
                      <NavLink to={"/login"} onClick={toggleDrawer}>
                        <span
                          className={
                            "hover:text-primary text-text-default flex items-center gap-1 duration-300"
                          }
                        >
                          <span className="text-grey-primary">
                            <Icon path={mdiLogin} size={1.4} />
                          </span>
                          Sign in
                        </span>
                      </NavLink>
                    </li>
                  )}
                  {navItems().map((item) => {
                    if (item.label === null) return null;

                    return (
                      <li key={item.path}>
                        <NavLink to={item.path} onClick={toggleDrawer}>
                          <span
                            className={
                              "hover:text-primary text-text-default flex items-center gap-1 duration-300"
                            }
                          >
                            <span className="text-grey-primary">
                              {item.icon}
                            </span>
                            {item.label}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </div>

                {/* logout mobile */}
                {token && (
                  <li
                    className="hover:text-primary flex cursor-pointer items-center gap-1 duration-300"
                    onClick={() => {
                      dispatch(removeToken());
                      queryClient.removeQueries(["lists"]);
                      toggleDrawer();
                      navigate("/");
                    }}
                  >
                    <span className="text-grey-primary">
                      <Icon path={mdiLogout} size={1.2} />
                    </span>
                    Log out
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
