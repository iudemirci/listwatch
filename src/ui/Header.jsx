import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";

import Logo from "./Logo";
import PageNavList from "./PageNavList";
import Search from "./Search";
import LoginPopover from "../components/popover/LoginPopover";
import SignupPopover from "../components/popover/SignupPopover";

function Header() {
  const isLoginOpen = useSelector((state) => state.popup.isLoginOpen);
  return (
    <header className="group/header relative flex items-center justify-between py-4">
      <Logo />
      <AnimatePresence>
        {!isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 2xl:gap-4"
          >
            <Search />
            <PageNavList />
          </motion.div>
        )}
      </AnimatePresence>

      <LoginPopover />
      <SignupPopover />
    </header>
  );
}

export default Header;
