import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
