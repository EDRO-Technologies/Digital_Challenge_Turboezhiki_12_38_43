import useUserStore from "@/store/useUserStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProvider = () => {
  const hasNext = useUserStore((state) => state.hasNext);
  // const isAuth = JSON.parse(localStorage.getItem("isAuth") || "false");
  const location = useLocation();

  if (hasNext && location.pathname !== "/next")
    return <Navigate to="/next" state={{ from: location }} />;

  // if (isAuth) return <Navigate to="/event" />;

  return <Outlet />;
};

export default AuthProvider;
