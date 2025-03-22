import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth/useLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/authSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login, isPending } = useLogin();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  function onSubmit(info) {
    login(info, {
      onSuccess: (res) => {
        // localStorage.setItem("token", res.session.access_token);
        dispatch(setToken(res.session.access_token));
        toast.success("Login Success");
        navigate("/", {
          replace: true,
        });
      },
      onError: () => toast.error("Login Failed"),
    });
  }

  return (
    <div className="flex items-center justify-center py-20">
      <form
        className="items flex w-[70vw] max-w-60 flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          E-mail
          <Input
            id="email"
            {...register("email", { required: "E-mail is required" })}
            type="email"
          />
        </label>
        <label className="flex flex-col">
          Password
          <Input
            {...register("password", { required: "Password is required" })}
            id="password"
            type="password"
          />
        </label>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default Login;
