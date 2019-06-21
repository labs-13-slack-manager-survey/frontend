import React from "react";
import { slackURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";
import "./SlackRedirect.css";
import Slackr from "../../images/slackr_icon.png";

const Slack = props => {
  const { slackToken } = jwt_decode(localStorage.getItem("token"));
  return (
    <>
      {!slackToken && (
        <div className="add-to-slack">
          <a
            href={`https://slack.com/oauth/authorize?client_id=648547424101.650773244214&scope=incoming-webhook,bot,channels:read,chat:write:bot,chat:write:user,im:write,emoji:read,commands,users:read,users:read.email&redirect_uri=${slackURL}`}
          >
            <div className="button-content">
              <img
                alt="Add to Slack"
                // className="slack-icon"
                height="40px"
                width="40px"
                src={Slackr}
                // srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
              />
              <div className="add-slackr-text">Add Slackr Bot to Slack</div>
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default Slack;
