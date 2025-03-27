import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { AnimatePresence, motion } from "motion/react";
import { useLogin } from "../hooks/auth/useLogin";
import { useForm } from "react-hook-form";

import Button from "./Button";
import Input from "./Input";

function LoginPopover({ isOpen, setIsOpen }) {
  const { register, handleSubmit, reset } = useForm();
  const { login, isPending } = useLogin();

  function onSubmit(info) {
    login(info, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -30 }}
          className="bg-grey-tertiary absolute top-0 right-0 z-50 rounded-b-lg p-4"
        >
          <form
            className="flex items-end gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Icon
              path={mdiClose}
              size={0.9}
              className="text-grey-primary hover:text-primary mb-0.5 cursor-pointer duration-300"
              onClick={() => setIsOpen(false)}
            />
            <label
              className={`text-grey-primary-light flex flex-col gap-1 text-xs ${isPending && "animate-pulse"}`}
            >
              E-mail
              <Input
                {...register("email", {
                  required: "E-mail is required",
                })}
                id="email"
                type="email"
                className="w-43 px-1.5 py-1"
                disabled={isPending}
              />
            </label>
            <label
              className={`text-grey-primary-light flex flex-col gap-1 text-xs ${isPending && "animate-pulse"}`}
            >
              Password
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type="password"
                className="w-43 px-1.5 py-1"
                disabled={isPending}
              />
            </label>

            <Button
              className={`rounded-lg px-2.5 py-0 ${isPending && "animate-pulse"}`}
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginPopover;
