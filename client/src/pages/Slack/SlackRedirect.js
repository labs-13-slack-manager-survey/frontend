import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth.js";
import { Spinner, Intent } from "@blueprintjs/core";
import ClearCookiesHelper from "./ClearCookiesHelper";
import Button from "@material-ui/core/Button";
import "./SlackRedirect.css";

class SlackRedirect extends Component {
  state = {
    error: ""
  };
  render() {
    return (
      <div className="redirect-container">
        {this.state.error.length > 0 ? (
          <>
            <h1 className="redirect-container-title">{this.state.error}</h1>
            {this.state.error ===
            "This browser is associated with another Slack user, please clear your cookies." ? (
              <ClearCookiesHelper />
            ) : null}
            <Button
              onClick={this.goBack}
              style={{ display: "block", margin: "auto", marginTop: "20px" }}
              variant="outlined"
              color="primary"
            >
              Return to dashboard
            </Button>
          </>
        ) : (
          <>
            <Spinner intent={Intent.PRIMARY} />
            <h1 className="redirect-container-title">Authorising User</h1>
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    const endpoint = `${baseURL}/auth/slack/${this.props.location.search}`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/slackr/dashboard");
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  }

  goBack = () => {
    this.setState({ error: "" });
    this.props.history.push("/slackr/dashboard");
  };
}

export default SlackRedirect;
