import React from "react";
import Firebase from "../Firebase/Firebase";
// import Card from "@material-ui/core/Card";
import Logo from "../../images/slackr_icon.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "./login.css";
// import { Divider } from "@material-ui/core";

const Login = props => {
  AOS.init() 
  return (
    <div className="container">
      <img src={Logo} alt="Slackr Logo" />
      <h2>LOGIN TO SLACKR</h2>

      <div className="firebase-card" data-aos="fade-up"
    data-aos-anchor-placement="center-bottom" data-aos-duration="1000">
        <Firebase {...props} />
      </div>
    </div>
  );
};

export default Login;

// frontend / client / src / images / slackr_icon.png;
