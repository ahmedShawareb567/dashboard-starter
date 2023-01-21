import { components, ControlProps, StylesConfig } from "react-select";
import { Loading } from "../../../Loading/Index";

export const ReactSelectCustomNoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="custom-css-class">No Data</span>
    </components.NoOptionsMessage>
  );
};

export const LoadingMessage = (props) => {
  return (
    <div {...props.innerProps} className="py-2 d-flex justify-content-center">
      <Loading size="sm" />
    </div>
  );
};
