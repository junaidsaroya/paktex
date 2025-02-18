import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ loged }) {
  return loged ? <Outlet /> : <Navigate to="/login" />;
}

export default Protected;
