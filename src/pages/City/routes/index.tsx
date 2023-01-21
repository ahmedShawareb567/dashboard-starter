import { lazy } from "react";
import { AuthorizedRoute } from "../../../components/AuthorizedRoute/Index";

const Page = lazy(() => import("../Index"));
const PageCreate = lazy(() => import("../Create"));

export default [
  {
    index: true,
    element: (
      <AuthorizedRoute name="CITY">
        <Page />
      </AuthorizedRoute>
    ),
  },
  {
    path: "create",
    element: (
      <AuthorizedRoute name="CITY_CREATE">
        <PageCreate />
      </AuthorizedRoute>
    ),
  },
];
