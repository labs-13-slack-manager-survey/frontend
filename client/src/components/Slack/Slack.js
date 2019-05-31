import React from "react";
import { slackURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

const Slack = props => {
  const { slackToken } = jwt_decode(localStorage.getItem("token"));
  return (
    <div>
      {/* <h3>
				{!props.slackTest
					? 'Respond to your daily standup on Slack by adding the integration below.'
					: 'Your Slack integration has been set up. Click the button below if you would like to edit your settings (even though it says Add).'}
			</h3> */}
      {!slackToken && (
        <a
          href={`https://slack.com/oauth/authorize?client_id=648547424101.650773244214&scope=incoming-webhook,bot,channels:read,chat:write:bot,chat:write:user,im:write,emoji:read,commands,users:read,users:read.email&redirect_uri=${slackURL}`}
          className="slack-icon"
        >
          <img
            alt="Add to Slack"
            // className="slack-icon"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
      )}
    </div>
  );
};

export default Slack;
