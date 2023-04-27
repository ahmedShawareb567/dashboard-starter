import "./scss/index.scss";

export const SvgIcon = ({ name = "", prefix = "icon", ...props }) => {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true" className="icon">
      <use href={symbolId} />
    </svg>
  );
};
