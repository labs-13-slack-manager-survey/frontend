import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import Dashboard from "../Dashboard/Dashboard";
import ReportsDash from "../Dashboard/ReportsDash";
import CircleProgress from "../../components/circleProgress.js";


// style imports

import "./view.css";
import { Card } from "@blueprintjs/core";

//Tour imports
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

// this is the container for ALL of '/dashboard'
class View extends Component {
  state = {
    roles: "member",
    rate: 0,
    active: true,
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        intro:
          "Welcome to the Slackr dashboard! From here managers have access to all essentials and team members can view the stand up reports that their managers have created."
      },
      {
        element: ".one",
        intro:
          "Here you can see all the reports. Managers can edit and delete existing reports. To select a specific report click on the respond button."
      },
      {
        element: ".two",
        intro: "This displays the percentage of completed reports."
      },
      {
        intro:
          "To add people to your team click the my team button on the left."
      },
      {
        intro:
          "To view more in depth statistics about the well being of your team and reports filled out by day click on the stats button on the left."
      },
      {
        intro:
          "Managers can use the + button on the side bar to create their first survey!"
      }
    ]
  };


  componentDidMount() {
    this.getData();
  }
  // refactor into async await for readability and promise.all for performance
  getData = async () => {
    try {
      const roles = jwt_decode(localStorage.getItem("token")).roles;
      const endpoint = `${baseURL}/users/byuser`;
      // make api calls at the same time
      const [userResponse, rateResponse] = await Promise.all([
        await axiosWithAuth().get(endpoint),
        await axiosWithAuth().get(`${baseURL}/reports/submissionRate`)
      ]);
      const rate = rateResponse.data.historicalSubmissionRate / 100;
      this.setState({
        active: userResponse.data.user.active,
        rate,
        roles
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  render() {
    const { stepsEnabled, steps, initialStep } = this.state;
    return this.state.active ? (
      <div className="dashboard-view">
        {localStorage.getItem("doneTour") === "yeah!" ? null : (
          <Steps
            className="step"
            enabled={stepsEnabled}
            steps={steps}
            initialStep={initialStep}
            onExit={this.onExit}
          />
        )}
        <div className="view">
          <Dashboard className="usersDash" role={this.state.roles} />
          <div className="one">
            <ReportsDash
              className="reportsDash"
              role={this.state.roles}
              {...this.props}
            />
          </div>
        </div>
        <div className="sidebar">
          <div className="two">
            <CircleProgress
              title="Today's Surveys"
              percentComplete={this.state.rate}
            />
          </div>
          {/* <PollCalendar /> */}
        </div>
      </div>
    ) : (
      <Card style={{ textAlign: "center" }}>
        Looks like your account has been deactivated. If you believe this is an
        error, please contact your manager.
      </Card>
    );
  }

  onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
    localStorage.setItem("doneTour", "yeah!");
  };
}

export default View;
