import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import InviteUser from '../../components/InviteUser.js';
import PageTitle from '../../components/PageTitle'
import PageDescription from '../../components/PageDescription'
import TableHeader from '../../components/TableHeader'

// import $ from 'jquery';
// import jCircle from 'jquery-circle-progress';

// style imports
// import "./view.css";
import { Card } from "@blueprintjs/core";
import TableDisplay from "../../components/TableHeader";

// this is the container for ALL of '/dashboard'
class myTeam extends Component {
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
        console.log(err.response.data);
      });
  }
  render() {
    //If user's account is inactive, they cannot see the dashboard

    return this.state.active ? (
      <div className = "dashboard-view">
        <div className="view">
        <PageTitle 
          title = "My Team"
        />
        <PageDescription description= "Add individuals via email to your team. everyone on your team who is also in your slack workplace will recieve direct messages through the slackr bot, alerting them to fill out a poll when it becomes available. Team members will be prompted to create an account on Slackr and view and respond to polls in the browser application."/>
        
        <TableHeader 
          column1 = "Member"
          column3 = "Polls completed" 
          column4 = "Last poll answered"
        />
        </div>
        <div className = "sidebar">
          <InviteUser />
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

export default myTeam;
