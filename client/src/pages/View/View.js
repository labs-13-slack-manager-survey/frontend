import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import Dashboard from "../Dashboard/Dashboard";
import ReportsDash from "../Dashboard/ReportsDash";
import SummaryBox from '../../components/SummaryBox';
import PollCalendar from '../../components/PollCalendar';
import CircleProgress from '../../components/circleProgress.js';
import InviteUser from '../../components/InviteUser.js';

// import $ from 'jquery';
// import jCircle from 'jquery-circle-progress';

// style imports
import "./view.css";
import { Card } from "@blueprintjs/core";

// this is the container for ALL of '/dashboard'
class View extends Component {
  state = {
    roles: "member",
    active: true
  };

  componentDidMount() {
    const roles = jwt_decode(localStorage.getItem("token")).roles;
    const endpoint = `${baseURL}/users/byuser`;

    axiosWithAuth()
      .get(endpoint)
      .then(res =>
        this.setState({
          active: res.data.user.active,
          roles: roles
        })
      )
      .catch(err => {
        console.log(err);
      });
  }
  render() {

    return this.state.active ? (
      <div className = "dashboard-view">
        <div className="view">
            <Dashboard className="usersDash" role={this.state.roles} />
            <ReportsDash
              className="reportsDash"
              role={this.state.roles}
              {...this.props}
            />
        </div>
        <div className = "sidebar">
          <CircleProgress 
          title = "Today's Polls"
          percentComplete = '0.6'/>

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
