import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import InviteUser from '../../components/InviteUser.js';
import PageTitle from '../../components/PageTitle'
import PageDescription from '../../components/PageDescription'
import TableHeader from '../../components/TableHeader'
import SlackButton from '../Slack/Slack.js'
import CircleProgress from '../../components/circleProgress.js';
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
    active: true,
    users: [], 
    anchorEl: null,
  };



  componentDidMount() {
    // get user's joinCode from token and setState accordingly. Necessary to invite new team members.
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

    const joinCode = jwt_decode(localStorage.getItem("token")).joinCode;
    console.log(joinCode);
    console.log(this.state.users.length)
    this.setState({
      joinCode: joinCode
    });
    axiosWithAuth()
      .get(`${baseURL}/users/team`)
      .then(res => {
        console.log(res);
        this.setState({ users: res.data.users });

        if (this.state.users.length > 0) {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => console.log(err));
  }

  updateUser = () => {
    const endpoint = `${baseURL}/users/`;
    const editedUser = {
      active: false
    };
    axiosWithAuth()
      .put(endpoint, editedUser)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  activateUser = id => {
    const endpoint = `${baseURL}/users/${id}`;
    const editedUser = {
      active: true
    };
    //create an array with everyone but the user the function's been called on
    const newUsers = this.state.users.filter(user => user.id !== id);
    axiosWithAuth()
      .put(endpoint, editedUser)
      .then(res => {
        newUsers.push(res.data.editedUser);
        this.setState({
          users: newUsers
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deactivateUser = id => {
    const endpoint = `${baseURL}/users/${id}`;
    const editedUser = {
      active: false
    };
    const newUsers = this.state.users.filter(user => user.id !== id);

    axiosWithAuth()
      .put(endpoint, editedUser)
      .then(res => {
        newUsers.push(res.data.editedUser);
        this.setState({
          users: newUsers,
          anchorEl: null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClickMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    //If user's account is inactive, they cannot see the dashboard
    const activeUsers = this.state.users.filter(user => user.active);
      console.log(activeUsers)
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

        {activeUsers.map(user => (
            <TableHeader 
            column1 = {user.fullName}
            // report = {report}
            // role={this.props.role}
            // archiveReport={this.archiveReport}
            // archiveModal={this.state.archiveModal}
            // ConsoleCheck = {this.ConsoleCheck}
            />
        ))}

        </div>
        <div className = "sidebar">
          <SlackButton/>
          <InviteUser />
          {/* <PollCalendar /> */}
          <CircleProgress 
          title = "Today's Polls"
          percentComplete = '0.6'/>
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
