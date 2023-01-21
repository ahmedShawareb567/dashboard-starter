import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./scss/index.scss";

export interface PageErrorElementInterface {
  status?: number;
}

export const PageErrorElement = () => {
  const error = useRouteError() as PageErrorElementInterface;

  return (
    <>
      {isRouteErrorResponse(error) && (
        <div className="pageError text-center pt-xxl pb-xxl">
          <h2 className="text-danger pageError-title">{error?.status}</h2>
          <p className="fs-md pageError-description">
            {error?.status === 404 && <span>This page doesn't exist!</span>}
          </p>
        </div>
      )}
    </>
  );
};
