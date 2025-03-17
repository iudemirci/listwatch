// import styles from "./PageNavList.module.css";
import { NavLink } from "react-router-dom";
import useWindowWidth from "../hooks/useWindowWidth";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { mdiBackburger } from "@mdi/js";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function PageNavList() {
  const [isClicked, setIsClicked] = useState(false);
  const width = useWindowWidth();

  function toggleDrawer() {
    setIsClicked((prevState) => !prevState);
  }

  return width >= 640 ? (
    <nav>
      <ul className="flex gap-2 text-xs font-extrabold uppercase 2xl:gap-4">
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
        <li>
          <NavLink to="/films">Films</NavLink>
        </li>
        <li>
          <NavLink to="/lists">Lists</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <div className="flex">
      <Icon path={mdiMenu} size={1.4} onClick={toggleDrawer} />
      <Drawer
        open={isClicked}
        direction="right"
        size={130}
        overlayOpacity={0.5}
        style={{ backgroundColor: "#131314" }}
        lockBackgroundScroll={true}
        onClose={toggleDrawer}
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <Icon path={mdiBackburger} size={1.4} onClick={toggleDrawer} />
          <nav>
            <ul className="flex flex-col items-center gap-2 text-[16px] font-extrabold uppercase lg:text-[9px] 2xl:gap-4 2xl:text-xs">
              <li>
                <NavLink to="/account" onClick={toggleDrawer}>
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/films" onClick={toggleDrawer}>
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/lists" onClick={toggleDrawer}>
                  Lists
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" onClick={toggleDrawer}>
                  News
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Drawer>
    </div>
  );
}

export default PageNavList;
