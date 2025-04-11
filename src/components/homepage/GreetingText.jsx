import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Button from "../../ui/Button";
import Github from "../../ui/Github";
import Title from "../../ui/Title";
import { Link } from "react-router-dom";

import { openSignupPopup } from "../../store/popupSlice";

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GreetingText() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto mt-[24rem] flex flex-col items-center gap-3 text-center sm:w-[350px] md:gap-3 lg:w-[450px] 2xl:w-[500px] 2xl:gap-6"
    >
      <motion.div variants={item}>
        <Title level={2}>
          List your favourite content. Track. Share. Don't miss any single
          thing.
        </Title>
      </motion.div>

      <motion.div variants={item}>
        {!token ? (
          <Button onClick={() => dispatch(openSignupPopup())}>
            Sign up. For Free!
          </Button>
        ) : (
          <Button>
            <Link to="/discover">Discover now!</Link>
          </Button>
        )}
      </motion.div>

      <motion.div variants={item} className="-mt-2">
        <Github />
      </motion.div>
    </motion.div>
  );
}
