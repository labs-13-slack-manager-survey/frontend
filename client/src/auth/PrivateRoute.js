import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem("token");
        if (!token) {
          return <Redirect to="/login" />;
        }
        const decoded = jwt_decode(token);

        if (!decoded) {
          return <Redirect to="/slackr/onboarding" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
