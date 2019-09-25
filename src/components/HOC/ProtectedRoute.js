import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  logged,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        logged ? <Component {...routeProps} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

export default ProtectedRoute;
