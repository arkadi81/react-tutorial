import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

/* reusable protected route component
interface identical to route, but this component is aware of the user
it redirects to login if no user 
*/

const ProtectedRoute = props => {
  const { path, component: Component, render, ...rest } = props;
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
