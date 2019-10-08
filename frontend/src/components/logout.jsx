import React, { Component } from "react";

class Logout extends Component {
  componentDidMount = () => {
    try {
      localStorage.removeItem("token");
      window.location = "/"; // not ideal at all?
    } catch (error) {}
  };

  render() {
    return null; // not rendering anything
  }
}

export default Logout;
