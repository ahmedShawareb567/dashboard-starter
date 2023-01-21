import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="app-mainLayout">
      <p>Main layout</p>
      <Outlet />
    </div>
  );
};
