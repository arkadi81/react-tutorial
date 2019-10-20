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
        console.log(props);
        if (!auth.getCurrentUser())
          return (
            <Redirect
              // the structure of the data passed to the to attribute is from react router docs. we need to pass the original location info so that we can redirect after login
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
