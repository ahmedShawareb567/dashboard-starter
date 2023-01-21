import { StylesConfig } from "react-select";

let colors = {
  primary: "#0a4a4a",
  secondary: "#b3db44",
  white: "#fff",
  danger: "#f44336",
  dark: "#000",
};

let dimensions = {
  height: "auto",
  minHeight: "48px",
};

const defaultControl = (provided, state) => ({
  ...provided,
  paddingRight: "1rem",
  borderColor: state.isFocused ? "colors.primary" : "colors.primary",
  minHeight: dimensions.minHeight,
  borderRadius: "8px",
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: "colors.primary",
  },
  fontWeight: 500,
});

const defaultContainer = (provided, state) => ({
  ...provided,
  borderColor: state.isFocused ? "colors.primary" : "colors.primary",
});

const defaultValueContainer = (provided, state) => ({
  ...provided,
  marginRight: "0rem",
  paddingRight: "0rem",
});

const defaultOption = (provided, state) => ({
  ...provided,
  color: state.isSelected ? colors.white : colors.dark,
  backgroundColor: state.isSelected ? colors.primary : colors.white,
  padding: "8px 10px",
  "&:active": {
    backgroundColor: colors.primary,
    color: colors.white,
  },
});

const defaultPlaceholder = (provided, state) => ({
  ...provided,
  fontWeight: 400,
  marginRight: state.isFocused ? ".6rem" : ".2rem",
});

const defaultDropdownIndicator = (provided, state) => ({
  ...provided,
  color: state.isFocused ? colors.primary : colors.dark,
  border: "none",
});

const defaultMenu = (provided, state) => ({
  ...provided,
  border: `.1rem solid ${colors.primary}`,
});

const defaultIndicatorSeparator = (provided, state) => ({
  ...provided,
  backgroundColor: "transparent",
});

const defaultAsyncControl = (css, state) => ({
  ...css,
  paddingRight: "0.75rem",
  paddingLeft: "0rem",
  borderColor: state.isFocused ? colors.secondary : colors.primary,
  backgroundColor: colors.white,
  minHeight: dimensions.minHeight,
  borderRadius: "8px",
  color: colors.primary,
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: colors.secondary,
  },
  fontWeight: 600,
});

const asyncMultiValue = (css, state) => ({
  ...css,
  backgroundColor: colors.primary,
  padding: ".2rem .5rem",
  color: colors.primary,
  borderRadius: ".3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const asyncMultiValueLabel = (css, state) => ({
  ...css,
  color: colors.white,
});

const asyncMultiValueRemove = (css, state) => ({
  ...css,
  backgroundColor: colors.white,
  padding: "0rem",
  width: "1.3rem",
  height: "1.3rem",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: "colors.primary",
  },
});

export const defaultAsyncErrorControl = (css, state) => ({
  ...css,
  paddingRight: ".75rem",
  borderColor: colors.danger,
  backgroundColor: "transparent",
  borderRadius: "8px",
  minHeight: dimensions.minHeight,
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: colors.danger,
  },
  fontWeight: 500,
});

const defaultAsyncMenu = (provided, state) => ({
  ...provided,
  border: ".1rem solid " + colors.primary,
  borderRadius: "1rem",
  padding: "1rem",
});

const defaultAsyncOption = (provided, state) => ({
  ...provided,
  color: state.isSelected ? colors.white : colors.primary,
  backgroundColor: state.isSelected ? colors.primary : colors.white,
  transition: "all .1s ease-in-out",
  borderRadius: "8px",
  padding: "8px 10px",
  margin: "2px 0px",
  "&:active": {
    backgroundColor: colors.primary,
    color: colors.white,
  },
});

// DEFAULT STYLE
export const reactSelectCustomStyles: StylesConfig<any> = {
  control: defaultControl,
  container: defaultContainer,
  valueContainer: defaultValueContainer,
  option: defaultOption,
  indicatorSeparator: defaultIndicatorSeparator,
  placeholder: defaultPlaceholder,
  dropdownIndicator: defaultDropdownIndicator,
  menu: defaultMenu,
};

export const reactSelectAsyncCustomStyles: StylesConfig<any> = {
  control: defaultAsyncControl,
  container: defaultContainer,
  valueContainer: defaultValueContainer,
  indicatorSeparator: defaultIndicatorSeparator,
  option: defaultAsyncOption,
  placeholder: defaultPlaceholder,
  dropdownIndicator: defaultDropdownIndicator,
  menu: defaultAsyncMenu,
  multiValue: asyncMultiValue,
  multiValueRemove: asyncMultiValueRemove,
  multiValueLabel: asyncMultiValueLabel,
};
