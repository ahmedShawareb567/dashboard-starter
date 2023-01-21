import "./scss/index.scss";

export const Loading = ({
  className = "",
  type = "",
  color = "",
  size = "sm",
  ...rest
}) => {
  return (
    <div className={`loading ${className} ${type} ${color} ${size}`} {...rest}>
      <div className="loading-circle"></div>
    </div>
  );
};
