import React from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // base class, reusable form component
// with the *, we will just have a userService object with functions as methods.
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {} // error messages corresponding to issues with data data
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //
    // console.log("Submitted");
    try {
      const response = await register(this.state.data);
      console.log(response);
      //access custom headers: make sure the backend exposes them
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        // only expected error here is that the email we've entered already exists (since that's the unique username)
        const errors = { ...this.state.errors };
        errors.username = exception.response.data;
        this.setState({ errors });
      }
    }
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
        </form>
      </div>
    );
  }
}

export default RegisterForm;
