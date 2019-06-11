import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth.js";
import jwt_decode from "jwt-decode";

// component imports
import Team from "./Team";
import InviteUser from "../../components/InviteUser";
import Slack from "../Slack/Slack";
import PageTitle from '../../components/PageTitle'
import SummaryBox from '../../components/SummaryBox';

// style imports
import { Spinner, Intent } from "@blueprintjs/core";
import { Card, Typography } from "@material-ui/core";
import "./dashboard.css";


export class Dashboard extends Component {
  state = {
    users: [],
    newMemberEmail: "",
    isLoading: true,
    message: "",
    active: true,
    modal: false,
    anchorEl: null,
    joinCode: ""
  };
  render() {
    if (this.state.isLoading) {
      return <Spinner intent={Intent.PRIMARY} className="loading-spinner" />;
    }
    return (
      <>
      <PageTitle 
      title = "Reports Dashboard"
      />
      <div className = "summary-boxes">
        <SummaryBox 
            title = "no. of team members"
            content = {this.state.users.length}/>

        <SummaryBox 
            title = "total poll responses" 
            content = {this.state.users.length}/>

        <SummaryBox 
            title = "total polls scheduled"
            content = {this.state.users.length}/>
      </div>
      <Card raised={true} className="teamDashboard">
        <header className="teamDashboard-header">
          <Typography variant="h3">Team</Typography>
        </header>
        <Team
          className="teamContainer"
          users={this.state.users}
          updateUser={this.updateUser}
          anchorEl={this.state.anchorEl}
          activateUser={this.activateUser}
          deactivateUser={this.deactivateUser}
          handleClickMenu={this.handleClickMenu}
          handleCloseMenu={this.handleCloseMenu}
        />
        <InviteUser
          changeHandler={this.changeHandler}
          addUser={this.addUser}
          message={this.state.message}
          clearMessage={this.clearMessage}
          modal={this.state.modal}
        />
        <Slack />
      </Card>
      </>
    );
  }

  componentDidMount() {
    // get user's joinCode from token and setState accordingly. Necessary to invite new team members.
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

  addUser = e => {
    e.preventDefault();
    //create mailObject to post to sendgrid API
    const mailObject = {
      email: this.state.newMemberEmail,
      joinCode: this.state.joinCode
    };
    console.log(mailObject);
    //sendgrid endpoint on our back end
    const endpoint = `${baseURL}/email`;

    axiosWithAuth()
      .post(endpoint, mailObject)
      .then(res => {
        console.log(res);
        this.setState({ message: "Email sent!", modal: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message:
            "There was an issue sending the email, please email your new team member manually.",
          modal: true
        });
      });
  };

  changeHandler = e => {
    this.setState({ newMemberEmail: e.target.value });
  };
  clearMessage = () => {
    this.setState({ message: "", modal: false });
  };
}

export default Dashboard;
