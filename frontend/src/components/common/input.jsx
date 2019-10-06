import React, { Component } from "react";

/* reusable input component

INTERFACE
name = name of the input (and the name of the control etc)
label = what the user sees
value = initial value
onChange - function pointer to handle change to fields

*/
const Input = ({ name, label, error, ...rest }) => {
  //type, value,onChange, substituted by {...rest}
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        // type={type}
        // value={value}
        // onChange={onChange}
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {/* if error is truthy, the second expression is returned, otherwise everything is ignored */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
