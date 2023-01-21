import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { RouteSuspended } from "../components/RouteSuspended/Index";

import { MainLayout } from "../layouts/Main/Index";
import { AuthLayout } from "../layouts/Auth/Index";

const HomePage = lazy(() => import("../pages/Home/Index"));
const VerifyPage = lazy(() => import("../pages/Verify/Index"));
const LoginPage = lazy(() => import("../pages/Login/Index"));

import CityRoutes from "../pages/City/routes";
import { PageErrorElement } from "../components/Errors/PageErrorElement/Index";
import { AuthorizedRoute } from "../components/AuthorizedRoute/Index";

const routesTree = (isLoggedIn) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <PageErrorElement />,
      children: [
        {
          index: true,
          element: (
            <AuthorizedRoute name="HOME">
              <HomePage />
            </AuthorizedRoute>
          ),
        },
        {
          path: "city",
          children: CityRoutes,
        },
      ],
    },

    {
      element: <AuthLayout />,
      loader: () => {
        if (isLoggedIn) return redirect("/");
        return true;
      },
      children: [
        {
          path: "/login",
          element: (
            <RouteSuspended>
              <LoginPage />
            </RouteSuspended>
          ),
        },
        {
          path: "/verify",
          element: (
            <RouteSuspended>
              <VerifyPage />
            </RouteSuspended>
          ),
        },
      ],
    },
  ]);
};

export { routesTree };
