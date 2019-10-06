import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    //returns errors after checking form. uses Joi. note - this is not responsible for populating state
    const options = {
      abortEarly: false
    };
    //interface - the obj we are validating, schema, options
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null; // if no errros, map null to errors object
    const errors = {};
    error.details.map(err => (errors[err.path[0]] = err.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // validates a property on change. name and value picked from event
    const obj = { [name]: value };
    // we need to give joi a "subschema" to just validate the one property
    const subSchema = {
      [name]: this.schema[name]
    };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
    // we want to abort early - from a usability prospective, its nicer to display one error at a time
  };

  handleSubmit = e => {
    e.preventDefault(); // prevents default submission to server
    const errors = this.validate();
    console.log(errors); // if errors is null, set it to an object
    this.setState({ errors: errors || {} });
    if (errors) return; // if any errors uncovered, stop and dont call the server

    // call server, process, redirect
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //event e argument destructured
    // console.log("change fired");
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    // console.log(errors);
  };
  //   render() {
  //     return <h1>form</h1>;
  //   }
}

export default Form;
