import { motion } from "motion/react";

import { createPortal } from "react-dom";

function PopupBlur({ setIsOpen, reset, children }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed inset-0 z-10000 flex items-center justify-center p-2 backdrop-blur-xs"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        reset && reset();
      }}
    >
      {children}
    </motion.div>,
    document.body,
  );
}

export default PopupBlur;
