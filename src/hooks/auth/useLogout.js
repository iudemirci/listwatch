import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logout as logoutApi } from "../../services/apiUser";
import { removeToken } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { resetSelectedReview } from "../../store/userSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error,
    isPending,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(removeToken());
      dispatch(resetSelectedReview());
      queryClient.removeQueries(["lists", "user"]);
      toast.success("Logged out");
      navigate("/");
    },
    onError: () => toast.error("Could not logout"),
  });
  return { logout, error, isPending };
}
