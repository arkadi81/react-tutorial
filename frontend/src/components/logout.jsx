import React, { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount = () => {
    try {
      //   localStorage.removeItem("token"); //delegated to auth service
      auth.logout();
      window.location = "/"; // not ideal at all?
    } catch (error) {}
  };

  render() {
    return null; // not rendering anything
  }
}

export default Logout;
