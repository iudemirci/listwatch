import { useState } from "react";

import Logo from "./Logo";
import PageNavList from "./PageNavList";
import Search from "./Search";
import LoginPopover from "./LoginPopover";
import { AnimatePresence, motion } from "motion/react";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
            className="flex items-center gap-2 transition 2xl:gap-4"
          >
            <Search />
            <PageNavList setIsOpen={setIsLoginOpen} isOpen={isLoginOpen} />
          </motion.div>
        )}
      </AnimatePresence>
      <LoginPopover isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </header>
  );
}

export default Header;
