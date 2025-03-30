import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

function PopupBlur({ isOpen, setIsOpen, reset, children }) {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [isOpen, scrollbarWidth]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed inset-0 z-10000 flex items-center justify-center p-2 backdrop-blur-xs"
      onClick={() => {
        setIsOpen(false);
        reset && reset();
      }}
    >
      {children}
    </motion.div>
  );
}

export default PopupBlur;
