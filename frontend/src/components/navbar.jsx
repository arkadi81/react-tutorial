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
        <div className="collapse navbar-collapse">
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
