import React from "react";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Password.css";

function Password(props) {
  const {
    name,
    register,
    error,
    showIcon,
    passwordShown,
    onClick,
    label = "Password",
    ...rest
  } = props;
  const faEyeSlash = <FaEyeSlash onClick={onClick} />;
  const faEye = <FaEye onClick={onClick} />;

  return (
    <div className="mt-3 eye-control">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        {...rest}
        {...register(name)}
        type={passwordShown ? "text" : "password"}
        className="form-control"
      />
      <IconContext.Provider value={{ className: "eye", size: "1.3em" }}>
        {showIcon && (passwordShown ? faEyeSlash : faEye)}
      </IconContext.Provider>
      {error && <div className="alert alert-danger p-2">{error}</div>}
    </div>
  );
}

export default Password;
