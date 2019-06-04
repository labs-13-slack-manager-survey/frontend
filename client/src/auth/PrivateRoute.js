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

        if (!decoded.teamId) {
=======
        console.log(decoded);

        if (!decoded) {
>>>>>>> 3d17272c3cbab7dcbf254972d32586c785494e65
          return <Redirect to="/onboarding" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;