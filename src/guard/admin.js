import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../store";

export default function AdminGuard({ children }) {
  const { state } = useContext(Store);
  const { wesabiUser, isAdmin } = state;

  return wesabiUser && isAdmin ? children : <Navigate to="/" />;
}
