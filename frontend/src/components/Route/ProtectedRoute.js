import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, isAdmin, user }) => {
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  if (isAdmin === false && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
