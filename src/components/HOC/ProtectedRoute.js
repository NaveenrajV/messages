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
      render={() => (logged ? <Component /> : <Redirect to={redirectTo} />)}
    />
  );
};

export default ProtectedRoute;
