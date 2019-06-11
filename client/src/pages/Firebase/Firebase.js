import React, { Component } from "react";
import axios from "axios";
import { baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";
import jstz from "jstz";

// firebase imports
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "../Login/login.css";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN
};

firebase.initializeApp(config);

class Firebase extends Component {
  render() {
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/slackr/onboarding",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: ({ user }) => {
          //redirect to custom API with the data we get from a success firebase auth
          axios
            .post(`${baseURL}/auth/firebase`, {
              user,
              timezone: jstz.determine().name()
            })
            .then(res => {
              localStorage.setItem("token", res.data);
              const token = jwt_decode(res.data);
              //   conditional rendering based on whether if the user belongs to a team
              if (token.teamId) {
                this.props.history.push("/slackr/dashboard");
              } else {
                this.props.history.push("/slackr/onboarding");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    };
    return (
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
        className="buttons"
      />
    );
  }
}

export default Firebase;
