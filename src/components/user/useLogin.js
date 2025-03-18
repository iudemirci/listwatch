import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const {
    isPending,
    error,
    mutate: login,
  } = useMutation({
    mutationFn: loginApi,
  });

  return { isPending, login };
}
