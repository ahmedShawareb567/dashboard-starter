import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";

import {
  LoadingMessage,
  ReactSelectCustomNoOptionsMessage,
} from "./Options/Index";
import {
  defaultAsyncErrorControl,
  reactSelectAsyncCustomStyles,
  reactSelectCustomStyles,
} from "./Options/Options";
import { ErrorMessage } from "@hookform/error-message";

export enum SelectType {
  SYNC = "SYNC",
  ASYNC = "ASYNC",
}

export interface OptionInterface {
  label: string;
  value: any;
}

interface SelectInputInterface {
  control?: any;
  errors?: any;
  rules?: any;
  name: string;
  placeholder?: string;
  type?: SelectType;
  options?: OptionInterface[];
  className?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  loadOptions?: (val) => Promise<OptionInterface[]>;
}

export const SelectInput = ({
  type = SelectType.SYNC,
  name,
  placeholder = "",
  control,
  errors,
  rules = {},
  options = [],
  isMulti = false,
  isSearchable = false,
  loadOptions,
  ...rest
}: SelectInputInterface) => {
  return (
    <div {...rest}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {type == SelectType.SYNC ? (
              <>
                <Select
                  {...field}
                  placeholder={placeholder}
                  options={options}
                  components={{
                    NoOptionsMessage: ReactSelectCustomNoOptionsMessage,
                  }}
                  isMulti={isMulti}
                  isSearchable={isSearchable}
                  styles={{
                    ...reactSelectCustomStyles,
                    ...(errors[name] && {
                      control: defaultAsyncErrorControl,
                    }),
                  }}
                />
              </>
            ) : (
              <>
                <AsyncSelect
                  {...field}
                  loadOptions={loadOptions}
                  placeholder={placeholder}
                  components={{
                    NoOptionsMessage: ReactSelectCustomNoOptionsMessage,
                    LoadingMessage,
                  }}
                  cacheOptions
                  defaultOptions
                  isMulti={isMulti}
                  styles={{
                    ...reactSelectAsyncCustomStyles,
                    ...(errors[name] && {
                      control: defaultAsyncErrorControl,
                    }),
                  }}
                />
              </>
            )}
          </>
        )}
      />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <>
              {message && (
                <p className="text-danger fs-xs pt-2 mb-0">{message}</p>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};
