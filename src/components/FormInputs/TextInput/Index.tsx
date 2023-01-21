import { forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";

interface TextInputInterface {
  name: string;
  errors?: any;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value) => void;
  onBlur?: (value) => void;
}

export const TextInput = forwardRef<any, TextInputInterface>(
  (
    {
      type = "text",
      placeholder = "",
      onChange,
      onBlur,
      name,
      label,
      errors,
      ...rest
    },
    ref
  ) => {
    return (
      <div {...rest}>
        {label && <label htmlFor={name}>{label}</label>}

        {type != "textarea" ? (
          <input
            type={type}
            ref={ref}
            className={`form-control ${errors && errors[name] && "is-invalid"}`}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            name={name}
            id={name}
          />
        ) : (
          <textarea
            ref={ref}
            className={`form-control ${errors && errors[name] && "is-invalid"}`}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            name={name}
            id={name}
          ></textarea>
        )}

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
  }
);
