import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../store";

export default function AuthGuard({ children }) {
  const { state } = useContext(Store);
  const { wesabiUser } = state;
  let isAdmin = false;
  return wesabiUser && isAdmin ? children : <Navigate to="/dashboard" />;
}
