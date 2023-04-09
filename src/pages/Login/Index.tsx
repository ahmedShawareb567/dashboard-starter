import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { $axios } from "../../client/axios";
import {
  SelectInput,
  SelectType,
} from "../../components/FormInputs/SelectInput/Index";
import { TextInput } from "../../components/FormInputs/TextInput/Index";
import { Shimmer } from "../../components/Shimmers/Index";
import { ShimmerTypes } from "../../components/Shimmers/types";
import { useEffectOnce, useAsync } from "react-use";
import { AppTable } from "../../components/AppTable/Index";

export default () => {
  const [passengers, setPassengers] = useState();

  const [statusOptions, setStatusOptions] = useState([
    {
      label: "Active",
      value: true,
    },
    {
      label: "In Active",
      value: false,
    },
  ]);

  const fetchRolesData = async (inputValue: string) => {
    try {
      // const { data } = await $axios.get(
      //   "https://jsonplaceholder.typicode.com/posts"
      // );

      // return (
      //   data.map((i) => ({
      //     value: i.id,
      //     label: i.title,
      //   })) || []
      // );

      return [];
    } catch (e) {
      console.log(e);
    }
  };

  const loadDoctorOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      resolve(fetchRolesData(inputValue));
    });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-xl">
          <div className="row">
            <TextInput
              className="col-md-6 mb-3"
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

            <TextInput
              className="col-md-6 mb-3"
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

            <SelectInput
              name="status"
              control={control}
              errors={errors}
              options={statusOptions}
              className="col-md-6 mb-3"
              rules={{
                required: "This input is required",
              }}
            />

            <SelectInput
              name="doctors"
              control={control}
              errors={errors}
              type={SelectType.ASYNC}
              isMulti
              loadOptions={loadDoctorOptions}
              className="col-md-6 mb-3"
              rules={{
                required: "This input is required",
              }}
            />
          </div>

          <button className="btn btn-primary">Click</button>
        </form>

        {/* <Shimmer type={ShimmerTypes.HEADER} cols={1} />
        <Shimmer type={ShimmerTypes.CARD} cols={4} />
        <Shimmer type={ShimmerTypes.HEADER} cols={1} /> */}
      </div>
    </div>
  );
};
