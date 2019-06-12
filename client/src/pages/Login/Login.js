import React from "react";
import Firebase from "../Firebase/Firebase";
import Card from "@material-ui/core/Card";
import Logo from "../../images/slackr_icon.png";

import "./login.css";
import { Divider } from "@material-ui/core";

const Login = props => {
  return (
    <div className="container">
      <img src={Logo} alt="Slackr Logo" />
      <h2>LOGIN TO SLACKR</h2>

      <div className="firebase-card">
        <Firebase {...props} />
      </div>
    </div>
  );
};

export default Login;

// frontend / client / src / images / slackr_icon.png;
