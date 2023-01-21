import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UseAuthInterface } from "../../store/auth";
import { RouteSuspended } from "../RouteSuspended/Index";

export const AuthorizedRoute = ({ name, children }: any) => {
  const isLoggedIn = useAuth((state: UseAuthInterface) => state.isLoggedIn);

  const hasPermission = useCallback(() => {
    if (isLoggedIn) return true;
    return false;
  }, [isLoggedIn]);

  return (
    <RouteSuspended>
      {!hasPermission() ? <Navigate to="/login" /> : children}
    </RouteSuspended>
  );
};
