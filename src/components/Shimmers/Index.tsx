import { Card } from "./Components/Card/Index";
import { Header } from "./Components/Header/Index";
import "./scss/index.scss";
import { ShimmerTypes } from "./types";
import { times } from "lodash";

export const Shimmer = ({ type = ShimmerTypes.CARD, cols = 1 }) => {
  const currentCols = () => Math.floor(12 / cols);
  const currentLoop = times(cols, (index) => index + 1);

  const currentComponent = () => {
    switch (type) {
      case ShimmerTypes.CARD:
        return <Card />;
        break;
      case ShimmerTypes.HEADER:
        return <Header />;
        break;
    }
  };

  return (
    <div className="shimmer-container">
      <div className="row">
        {currentLoop.map((item) => (
          <div className={`col-md-${currentCols()} mb-4`} key={item}>
            {currentComponent()}
          </div>
        ))}
      </div>
    </div>
  );
};
