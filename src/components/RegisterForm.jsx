import React from "react";
import { useForm } from "react-hook-form";
import auth from "./../services/authService";
import { registerUser } from "./../services/userService";
import Input from "./../common/Input";
import Password from "./../common/Password";
import withVisibility from "./withPasswordVisibility";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().email().required().label("Username"),
  password: yup.string().min(5).required().label("Password"),
  name: yup.string().required().label("Name"),
});

function RegisterForm({ onClick, passwordShown }) {
  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  };
  const { register, handleSubmit, formState, watch, setError } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const { headers } = await registerUser(data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        setError("username", { type: "custom", message: error.response.data });
    }
  };

  return (
    <React.Fragment>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          name="username"
          label="Username"
          register={register}
          error={errors.username?.message}
        />
        <Password
          name="password"
          showIcon={watch("password")}
          passwordShown={passwordShown}
          onClick={onClick}
          register={register}
          error={errors.password?.message}
        />
        <Input
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />
        <button className="btn btn-primary btn-sm mt-3">Save</button>
      </form>
    </React.Fragment>
  );
}

export default withVisibility(RegisterForm);
