import Sprites from "../../sprites.svg";

import "./index.scss";

export const SvgIcon = ({ name, ...rest }) => {
  return (
    <span {...rest}>
      <svg className={`icon icon-${name}`} fill="currentColor">
        <use href={`${Sprites}#icon-${name}`} />
      </svg>
    </span>
  );
};
