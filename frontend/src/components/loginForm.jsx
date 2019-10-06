import React, { Component } from "react";

import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {} // error messages corresponding to issues with account data
  };

  //   username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  validate = () => {
    const { account } = this.state;
    const errors = {};

    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";
    return Object.keys(errors).length === 0 ? null : errors; // if any keys present, return errors, otherwise null
  };
  handleSubmit = e => {
    e.preventDefault(); // prevents default submission to server
    const errors = this.validate();
    console.log(errors); // if errors is null, set it to an object
    this.setState({ errors: errors || {} });
    if (errors) return; // if any errors uncovered, stop and dont call the server

    // call server, process, redirect
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    //event e argument destructured
    // console.log("change fired");
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
