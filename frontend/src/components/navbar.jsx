import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";
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
    const { totalCounters } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          My app name
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-iem nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-iem nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-iem nav-link" to="/rentals">
              Rentals
            </NavLink>
            <NavLink className="nav-iem nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-iem nav-link" to="/register">
              Register
            </NavLink>
          </div>
        </div>

        {/* <span className="badge badge-pill badge-secondary">
          {totalCounters}
          
        </span> */}
      </nav>
    );
  }
}

export default Navbar;
