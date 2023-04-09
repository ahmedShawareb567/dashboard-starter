import "./scss/index.scss";

export const Header = () => {
  return (
    <div className="shimmer-header">
      <div className="d-flex">
        <div className="shimmer-header-circle rounded-circle flex-shrink-0 shimmer"></div>
        <div className="ms-md w-100">
          <div className="shimmer-header-rectangle border-r-1 mb-2 shimmer"></div>
          <div className="shimmer-header-rectangle border-r-1 shimmer w-75"></div>
        </div>
      </div>
    </div>
  );
};
