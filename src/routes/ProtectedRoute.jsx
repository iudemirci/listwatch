import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Spinner from "../ui/Spinner";

function ProtectedRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session || !token) {
        navigate("/login");
      }

      setCheckingSession(false);
    };

    checkSession();
  }, [token, navigate]);

  if (checkingSession)
    return (
      <div className="flex size-full items-center justify-center">
        <Spinner />
      </div>
    );

  return <Outlet />;
}

export default ProtectedRoute;
