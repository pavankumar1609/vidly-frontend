function Select({ genres, name, label, register, error, ...rest }) {
  return (
    <div className="mt-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select id={name} {...rest} {...register(name)} className="form-select">
        <option value="" className="text-muted">
          Select an option
        </option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger p-2">{error}</div>}
    </div>
  );
}

export default Select;
