import { Suspense } from "react";

export const RouteSuspended = ({ children }) => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </>
  );
};
