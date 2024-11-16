import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth") || "false");
  const hasNextPage = JSON.parse(localStorage.getItem("hasNext") || "false");
  return !isAuth && !hasNextPage ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoute;
