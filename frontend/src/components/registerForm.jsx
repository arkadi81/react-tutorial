import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // base class, reusable form component

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {} // error messages corresponding to issues with data data
  };

  //   joy schema not part of state - its not changing
  schema = {
    username: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  //   username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  doSubmit = () => {
    //
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
          {/* <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          /> */}
          {/* <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          /> */}
          {/* validate returns either null or an object. null is falsy, objects are truthy. */}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
