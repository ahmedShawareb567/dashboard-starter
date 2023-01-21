import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="app-authLayout">
      <p>Auth layout</p>
      <Outlet />
    </div>
  );
};
