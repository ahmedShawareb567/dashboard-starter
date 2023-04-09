export const Card = () => {
  return (
    <div className="shimmer-card">
      <div className="ratio ratio-3x2">
        <div className="shimmer border-r-1"></div>
      </div>

      <div className="ratio ratio-15x1 my-3">
        <div className="shimmer border-r-1"></div>
      </div>

      <div className="ratio ratio-15x1 my-3">
        <div className="shimmer w-75 border-r-1"></div>
      </div>
    </div>
  );
};
