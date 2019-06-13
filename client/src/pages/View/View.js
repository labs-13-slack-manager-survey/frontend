import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import Dashboard from "../Dashboard/Dashboard";
import ReportsDash from "../Dashboard/ReportsDash";
import SummaryBox from "../../components/SummaryBox";
import PollCalendar from "../../components/PollCalendar";
import CircleProgress from "../../components/circleProgress.js";
import InviteUser from "../../components/InviteUser.js";

// import $ from 'jquery';
// import jCircle from 'jquery-circle-progress';

// style imports
import "./view.css";
import { Card } from "@blueprintjs/core";

//Tour imports
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

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
        intro: 'Welcome to the Slackr reports dashboard! From here managers have access to all essentials and team members can view polls that have been created.',
      },
      {
        element: '.one',
        intro: 'Here you can see all the reports. Managers can edit and delete existing reports. To select a specific report click on it\'s name.'
      },
      {
        element: '.two',
        intro: 'This displays the percentage of completed reports.'
      },
      {
        intro: 'To view more in depth statistics about the well being of your team click on the stats button on the left.'
      },
      {
        intro: 'To create your first report click on the Add Poll button on top of the screen.'
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
    const { stepsEnabled, steps, initialStep} = this.state;
    return this.state.active ? (
      <div className="dashboard-view">
      {localStorage.getItem('doneTour') === 'yeah!' ? 
      null :
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={this.onExit}
    /> }
        <div className="view">
          <Dashboard className="usersDash" role={this.state.roles} />
          <div className="one">
          <ReportsDash
            className="reportsDash"
            role={this.state.roles}
            {...this.props}
          /></div>
        </div>
        <div className="sidebar">
          <div className="two">
          <CircleProgress
            title="Today's Polls"
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
    this.setState(() => ({ stepsEnabled: false}));
    localStorage.setItem('doneTour', 'yeah!');
  };
}

export default View;
