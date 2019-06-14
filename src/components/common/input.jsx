import React from "react";

const Input = ({
  obligatory = false,
  type,
  name,
  label,
  value,
  onChange,
  autoFocus,
  error
}) => {
  const styleAsterisk = { color: "red" };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {obligatory && <span style={styleAsterisk}>*</span>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        className="form-control"
        autoFocus={autoFocus ? true : false}
      />

      {/* If error is not null or truthy then return div */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
