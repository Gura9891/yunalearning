import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckUserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default CheckUserRoute;
