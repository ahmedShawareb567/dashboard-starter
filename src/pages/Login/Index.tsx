import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { TextInput } from "../../components/FormInputs/TextInput/Index";

export default () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <TextInput
                type="text"
                {...register("firstName", {
                  required: "This is Field is required !!",
                  minLength: {
                    value: 6,
                    message: "min length should be greater than",
                  },
                })}
                errors={errors}
              />
            </div>

            <div className="col-md-6">
              <TextInput
                type="text"
                {...register("lastName", {
                  required: "This is Field is required !!",
                  minLength: {
                    value: 6,
                    message: "min length should be greater than",
                  },
                })}
                errors={errors}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3">Click</button>
        </form>
      </div>
    </div>
  );
};
