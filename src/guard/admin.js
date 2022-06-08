import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  let isAdmin = false;
  return isAdmin ? children : <Navigate to="/dashboard" />;
}
