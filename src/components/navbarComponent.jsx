import React, { Component } from "react";

// if we wanted to have the Navbar as stateless functional component, we could also do:
/*const Navbar = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge badge-pill badge-secondary">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};*/

class Navbar extends Component {
  //state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <span className="badge badge-pill badge-secondary">
          {this.props.totalCounters}
          {/* look, a comment*/}
        </span>
      </nav>
    );
  }
}

export default Navbar;
