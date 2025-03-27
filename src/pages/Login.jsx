import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Title from "../ui/Title";
import LogoIcon from "../ui/LogoIcon";

function Login() {
  const token = useSelector((state) => state.auth.token);
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
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <form
        className="bg-grey-secondary grid-rows-[1fr, min-content] grid min-w-98 gap-3 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-9 pt-9">
          <div className="flex flex-col items-center gap-2 self-center pb-4">
            <LogoIcon size={1.3} />
            <Title level={1} className="flex gap-1">
              Sign in to
              <Link to="/" className="hover:text-primary duration-300">
                list&watch
              </Link>
            </Title>
          </div>
          <div className="flex flex-col gap-3">
            <label
              className={`text-grey-primary-light flex flex-col gap-1 text-xs ${isPending && "animate-pulse"}`}
            >
              E-mail
              <Input
                id="email"
                {...register("email", { required: "E-mail is required" })}
                type="email"
                disabled={isPending}
              />
            </label>
            <label
              className={`text-grey-primary-light flex flex-col gap-1 text-xs ${isPending && "animate-pulse"}`}
            >
              Password
              <Input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                disabled={isPending}
              />
            </label>
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
          <span className="hover:text-primary cursor-pointer text-sm duration-300">
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
