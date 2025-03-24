// import styles from "./PageNavList.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useWindowWidth from "../hooks/useWindowWidth";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { mdiBackburger } from "@mdi/js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/authSlice";
import { Drawer } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const navItems = () => [
  { label: "Login", path: "/login" },
  { label: "Account", path: "/account" },
  { label: "Films", path: "/films" },
  { label: "lists", path: "/lists" },
  { label: "News", path: "/news" },
];

function PageNavList() {
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleDrawer() {
    setIsClicked((prevState) => !prevState);
  }

  function isEnabled(index) {
    if (token && index === 0) return true;
    return false;
  }

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex gap-2 text-xs font-extrabold uppercase 2xl:gap-4 2xl:text-sm">
          {navItems().map(
            (item, i) =>
              !isEnabled(i) && (
                <li key={item.path}>
                  <NavLink to={item.path}>{item.label}</NavLink>
                </li>
              ),
          )}
        </ul>
      </nav>
      <div className="flex md:hidden">
        <Icon
          path={mdiMenu}
          size={1.4}
          onClick={toggleDrawer}
          className="hover:text-primary cursor-pointer duration-300"
        />
        <Drawer
          open={isClicked}
          onClose={toggleDrawer}
          width={150}
          styles={{
            body: {
              backgroundColor: "var(--color-background-default)",
              color: "var(--color-text-default)",
            },
            header: {
              backgroundColor: "var(--color-background-default)",
            },
          }}
          closeIcon={false}
          destroyOnClose={true}
          keyboard={true}
        >
          <div>
            <div className="flex flex-col items-center gap-2 p-2">
              <Icon
                path={mdiBackburger}
                className="hover:text-primary cursor-pointer duration-300"
                size={1.4}
                onClick={toggleDrawer}
              />
              <nav>
                <ul className="flex flex-col items-center gap-2 text-[16px] font-extrabold uppercase lg:text-[9px] 2xl:gap-4 2xl:text-xs">
                  {navItems().map(
                    (item, i) =>
                      !isEnabled(i) && (
                        <li key={item.path}>
                          <NavLink to={item.path} onClick={toggleDrawer}>
                            <span
                              className={
                                "hover:text-primary text-text-default duration-300"
                              }
                            >
                              {item.label}
                            </span>
                          </NavLink>
                        </li>
                      ),
                  )}

                  {token && (
                    <li
                      className="absolute bottom-3 cursor-pointer"
                      onClick={() => {
                        dispatch(removeToken());
                        queryClient.removeQueries(["lists"]);
                        toggleDrawer();
                        navigate("/");
                      }}
                    >
                      Log out
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default PageNavList;
