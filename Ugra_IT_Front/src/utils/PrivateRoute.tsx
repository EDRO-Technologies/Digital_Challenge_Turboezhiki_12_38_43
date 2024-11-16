import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth") || "false");
  return !isAuth ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoute;
