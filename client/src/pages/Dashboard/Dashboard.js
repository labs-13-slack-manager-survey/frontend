import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth.js";
import jwt_decode from "jwt-decode";

// component imports
// import Slack from "../Slack/Slack";
import PageTitle from '../../components/PageTitle'
import SummaryBox from '../../components/SummaryBox';
import UserFeedback from '../../components/UserFeedback.js';
import Question from '../../images/icons/question-circle-blue.png'

// style imports
import { Spinner, Intent} from "@blueprintjs/core";
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
    joinCode: "",
    reports: [],
    totalResponses: 0
  };

  render() {
    const token = jwt_decode(localStorage.getItem("token"));
    if (this.state.isLoading) {
      return <Spinner intent={Intent.PRIMARY} className="loading-spinner" />;
    }
    return (
      <>
      <div className = "main-dashboard-header">
          <PageTitle 
          title = "My Surveys"
          />
          <img src={Question} onClick={this.optIn} alt="app tour" className="tourButton"/>
        </div>
      {token.roles === "admin" ? <div className = "summary-boxes">
        <SummaryBox 
            title = "no. of team members"
            content = {this.state.users.length}/>

            <SummaryBox
              title="total survey responses"
              content={this.state.totalResponses}
            />

        <SummaryBox 
            title = "total surveys scheduled"
            content = {this.state.reports.length}/>
      </div> : null }

      </>
    );
  }

  componentDidMount() {
    // get user's joinCode from token and setState accordingly. Necessary to invite new team members.
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

    //get total submission rate for team
    axiosWithAuth()
      .get(`${baseURL}/reports/submissionRate`)
      .then(res => {
        this.setState({
          totalResponses: res.data.totalResponses
        });
      })
      .catch(err => console.log(err));

    //get Reports
    const endpoint = `${baseURL}/reports`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        this.setState({
          message: res.data.message,
          reports: res.data.reports
        });
        this.setState({ isLoading: false });
      })
      .catch(err => console.log(err));
  }

  getTotalPolls = () => {
    axiosWithAuth()
      .get(`${baseURL}/reports/submissionRate`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
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

  optIn = () => {
    localStorage.removeItem("doneTour");
    window.location.reload(true);
  };
}

export default Dashboard;
