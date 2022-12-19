import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "./../services/authService";
import Input from "./../common/Input";
import Password from "./../common/Password";
import withVisibility from "./withPasswordVisibility";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required().label("Username"),
  password: yup.string().min(5).required().label("Password"),
});

function LoginForm({ onClick, passwordShown, user }) {
  const { state } = useLocation();

  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  };
  const { register, handleSubmit, formState, watch, setError } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await auth.login(data.username, data.password);
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        setError("username", { type: "custom", message: error.response.data });
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <React.Fragment>
      <h1>Login</h1>
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
        <button className="btn btn-primary btn-sm mt-3">Save</button>
      </form>
    </React.Fragment>
  );
}

export default withVisibility(LoginForm);
