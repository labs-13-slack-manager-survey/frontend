import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

//components
import Dashboard from "../Dashboard/Dashboard";
import ReportsDash from "../Dashboard/ReportsDash";
import SummaryBox from "../../components/SummaryBox";
import TableDisplay from "../../components/TableDisplay";
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
        console.log(err.response.data);
      });
  }
  render() {
    // If user's account is inactive, they cannot see the dashboard
    return this.state.active ? (
      <div className="view">
        {/* <TableDisplay 
        column1 = "Report Name"
        column2 = "Date Created"
        column3 = "Schedule" 
        column4 = "Total Responses"/>
        <div className = "summaryStats">
          <SummaryBox 
            title = "total poll responses"
            content = "8"/>
          <SummaryBox 
            title = "no. scheduled polls"
            content = "8"/>
        </div> */}
        <Dashboard className="usersDash" role={this.state.roles} />
        <ReportsDash
          className="reportsDash"
          role={this.state.roles}
          {...this.props}
        />
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
