import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { mdiArrowLeft } from "@mdi/js";

import MdiIcon from "../ui/MdiIcon";
import Button from "../ui/Button";
import Title from "../ui/Title";
import LogoIcon from "../ui/LogoIcon";
import InputField from "../ui/InputField";
import SignupPopover from "../components/popover/SignupPopover";

import { useLogin } from "../hooks/auth/useLogin";

function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const { register, handleSubmit, reset } = useForm();
  const { login, isPending } = useLogin();
  function onSubmit(info) {
    login(info, {
      onSuccess: reset,
    });
  }

  if (token) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-2 backdrop-blur-xs">
      <form
        className="bg-grey-tertiary border-grey-secondary grid-rows-[1fr, min-content] relative m-3 grid w-105 gap-3 rounded-lg border-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="absolute top-3 left-3">
          <MdiIcon onClick={() => navigate("/")} path={mdiArrowLeft} />
        </span>
        <div className="px-9 pt-9">
          <div className="flex flex-col items-center gap-2 self-center pb-4 text-nowrap">
            <LogoIcon size={1.3} />
            <Title level={1} className="flex gap-1">
              Sign in to
              <Link to="/" className="hover:text-primary duration-300">
                list&watch
              </Link>
            </Title>
          </div>
          <div className="flex flex-col gap-3">
            <InputField
              {...register("email", { required: "E-mail is required" })}
              label="E-mail"
              id="email"
              type="email"
              isPending={isPending}
              value="jack3@example.com"
            />
            <InputField
              {...register("password", { required: "Password is required" })}
              label="Password"
              id="password"
              type="password"
              isPending={isPending}
              value="test123"
            />
          </div>
          <div className="flex justify-end gap-1.5 pt-4 pb-6">
            <Button
              className={`px-3 py-0.5 text-base tracking-wider uppercase ${isPending && "animate-pulse"}`}
              disabled={isPending}
            >
              Login
            </Button>
          </div>
        </div>
        <div className="border-grey-primary flex gap-1 border-t-1 px-9 py-4">
          <p className="text-grey-primary-light text-sm">
            Dont't have an account?
          </p>
          <span
            className="text-primary cursor-pointer text-sm duration-300"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
      <SignupPopover />
    </div>
  );
}

export default Login;
