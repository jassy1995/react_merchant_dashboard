import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../store";

export default function AuthGuard({ children }) {
  const { state, dispatch } = useContext(Store);
  const { wesabiUser } = state;
  console.log(wesabiUser);
  if (wesabiUser) {
    if (Number(wesabiUser.id) === 35011 || Number(wesabiUser.id) === 35010) {
      dispatch({ type: "UPDATE_ADMIN", payload: true });
    }
  }
  return wesabiUser ? children : <Navigate to="/" />;
}
