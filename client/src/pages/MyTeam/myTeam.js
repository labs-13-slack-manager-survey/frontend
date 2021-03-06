import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import InviteUser from "../../components/InviteUser.js";
import PageTitle from "../../components/PageTitle";
import PageDescription from "../../components/PageDescription";
import TableHeader from "../../components/TableHeader";
import SlackButton from "../Slack/Slack.js";
// import CircleProgress from '../../components/circleProgress.js';
// import $ from 'jquery';
// import jCircle from 'jquery-circle-progress';

// style imports
import "./myTeam.css";
import { Card } from "@blueprintjs/core";

// this is the container for ALL of '/dashboard'
class myTeam extends Component {
  state = {
    roles: "member",
    active: true,
    users: [],
    anchorEl: null,
    pollCompletion: 0,
    lastAnswerPoll: "No Surveys Answered"
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
    this.setState({
      joinCode: joinCode
    });
    axiosWithAuth()
      .get(`${baseURL}/users/team`)
      .then(res => {
        this.setState({ users: res.data.users });

        if (this.state.users.length > 0) {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => console.log(err));

    const pollEndpoint = `${baseURL}/reports`;

    axiosWithAuth()
      .get(pollEndpoint)
      .then(res => {
        const lastReport = res.data.reports.length - 1;
        this.setState({
          pollCompletion: res.data.reports.length,
          lastAnswerPoll: res.data.reports[lastReport].reportName
        });
      })
      .catch(err => {
        console.log("ERROR GETTING POLL COMPLETED", err);
      });
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

  lastCompletedPoll = () => {
    const endpoint = `${baseURL}/responses`;

    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        console.log("COMPLETED POLL", res);
        console.log("last pull answered", res.reports[-1].reportName);
      })
      .catch(err => {
        console.log("ERR WITH LAST POLL", err);
      });
    };
    
    archiveReport = id => {
      const endpoint = `${baseURL}/reports/${id}`;
      const updatedReport = {
        active: false
      };
      axiosWithAuth()
      .put(endpoint, updatedReport)
      .then(res => {
        this.props.getReports();
        this.handleArchive();
      })
      .catch(err => console.log(err));
    };
    
    render() {
      //If user's account is inactive, they cannot see the dashboard
      const activeUsers = this.state.users.filter(user => user.active);
      return this.state.active ? (
        <div className="dashboard-view">
        <div className="view">
          <PageTitle title="My Team" />
          <PageDescription description="Add individuals via email to your team. everyone on your team who is also in your slack workplace will recieve direct messages through the slackr bot, alerting them to fill out a survey when it becomes available. Team members will be prompted to create an account on Slackr and view and respond to surveys in the browser application." />

          <TableHeader
            column1=""
            column2="Name"
            column3="Surveys completed"
            column4="Last poll answered"
            column5=" "
            />

          {activeUsers.map(user => (
            <TableHeader
              column1={<img className="proPic" src={user.profilePic} alt="Not Found" />}
              column2={user.fullName}
              column3={this.state.pollCompletion}
              column4={this.state.lastAnswerPoll}
              column5={user.roles === 'admin' ? 'Team Leader' : 'Team Member'}
              // report = {report}
              // archiveReport={this.archiveReport}
              // archiveModal={this.state.archiveModal}
              // ConsoleCheck = {this.ConsoleCheck}
            />
            ))}
        </div>

        <div className="sidebar">
          <InviteUser />
          <div className="slack-button-team-page"><SlackButton /></div>
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
