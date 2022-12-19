function Input({ name, label, register, error, type = "text", ...rest }) {
  return (
    <div className="mt-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...rest}
        {...register(name)}
        className="form-control"
      />
      {error && <div className="alert alert-danger p-2">{error}</div>}
    </div>
  );
}

export default Input;
