import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isPending,
    error,
    mutate: login,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      dispatch(setToken(res.session.access_token));
      toast.success("Login Success");
      navigate("/", {
        replace: true,
      });
    },
    onError: () => toast.error("Login Failed"),
  });

  return { isPending, login };
}
