import React from "react";

/* reusable input component

INTERFACE
name = name of the input (and the name of the control etc)
label = what the user sees
value = initial value
onChange - function pointer to handle change to fields

*/
const Select = ({ name, label, error, items, ...rest }) => {
  //type, value,onChange, substituted by {...rest}
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="custom-select" name={name} id={name} {...rest}>
        <option value="" />
        {items.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {/* <input
        // type={type}
        // value={value}
        // onChange={onChange}
        {...rest}
        name={name}
        id={name}
        className="form-control"
      /> */}
      {/* if error is truthy, the second expression is returned, otherwise everything is ignored */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
