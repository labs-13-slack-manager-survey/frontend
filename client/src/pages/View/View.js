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

// this is the container for ALL of '/dashboard'
class View extends Component {
  state = {
    roles: "member",
    rate: 0,
    active: true
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
    return this.state.active ? (
      <div className="dashboard-view">
        <div className="view">
          <Dashboard className="usersDash" role={this.state.roles} />
          <ReportsDash
            className="reportsDash"
            role={this.state.roles}
            {...this.props}
          />
        </div>
        <div className="sidebar">
          <CircleProgress
            title="Today's Polls"
            percentComplete={this.state.rate}
          />

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
}

export default View;
