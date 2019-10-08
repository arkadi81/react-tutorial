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
            {!this.props.user && ( // if no user here, then build login and register stuff since those are truthy.
              <React.Fragment>
                <NavLink className="nav-iem nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-iem nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {this.props.user && ( // if no user here, then build login and register stuff since those are truthy.
              <React.Fragment>
                <NavLink className="nav-iem nav-link" to="/profile">
                  {this.props.user.name}
                </NavLink>
                <NavLink className="nav-iem nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
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
