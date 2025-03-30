import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    error,
    mutate: signup,
    isPending,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success("Signed up successfully"),
    onError: (error) => toast.error(error.message),
  });
  return { error, signup, isPending };
}
