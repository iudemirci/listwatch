import { motion } from "motion/react";

const dotVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
const dot = "bg-primary size-2 rounded-full will-change-transform";

function Spinner() {
  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex items-center justify-center"
    >
      <motion.div className={dot} variants={dotVariants} />
      <motion.div className={dot} variants={dotVariants} />
      <motion.div className={dot} variants={dotVariants} />
    </motion.div>
  );
}

export default Spinner;
