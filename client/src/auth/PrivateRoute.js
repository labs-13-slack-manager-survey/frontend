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
<<<<<<< HEAD
        console.log(decoded);

        if (!decoded) {
=======

        if (!decoded.teamId) {
>>>>>>> 0a7707a51e01371e3110cdb2db1959e1a241a26a
          return <Redirect to="/onboarding" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
