import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { AnimatePresence, motion } from "motion/react";
import { useLogin } from "../../hooks/auth/useLogin";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import Input from "../../ui/InputField";
import Spinner from "../../ui/Spinner";
import { closeLoginPopup } from "../../store/popupSlice";

function LoginPopover() {
  const { register, handleSubmit, reset } = useForm();
  const { login, isPending } = useLogin();
  const isLoginOpen = useSelector((state) => state.popup.isLoginOpen);
  const dispatch = useDispatch();

  function onSubmit(info) {
    login(info, {
      onSuccess: () => {
        reset();
        dispatch(closeLoginPopup());
      },
    });
  }

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -30 }}
          transition={{ ease: "easeInOut" }}
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
              onClick={() => dispatch(closeLoginPopup())}
            />

            <Input
              {...register("email", {
                required: "E-mail is required",
              })}
              label="E-mail"
              id="email"
              type="email"
              className="w-43 px-1.5 py-1"
              isPending={isPending}
              value="jack3@example.com"
            />

            <Input
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              id="password"
              type="password"
              className="w-43 px-1.5 py-1"
              isPending={isPending}
              value="test123"
            />
            <div className="flex flex-col gap-2">
              {isPending && <Spinner />}
              <Button
                className={`rounded-lg px-2.5 py-0 ${isPending && "animate-pulse"}`}
                disabled={isPending}
              >
                Login
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginPopover;
