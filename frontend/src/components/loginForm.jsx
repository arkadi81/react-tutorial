import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // base class, reusable form component
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {} // error messages corresponding to issues with data data
  };

  //   joy schema not part of state - its not changing
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  //   username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  doSubmit = async () => {
    //
    // console.log("Submitted");
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      // console.log(jwt);
      localStorage.setItem("token", jwt);
      //redirect
      // this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //wrong username /pw combo
        const errors = { ...this.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
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

export default LoginForm;
