import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// component imports
import ChooseReport from "../Reports/ModifyReports/ChooseReport";
import CreateReport from "../Reports/ModifyReports/CreateReport";
import CreateSentiment from "../Reports/ModifyReports/CreateSentiment";
import Reports from "../Reports/Reports";
import EditReport from "../Reports/ModifyReports/EditReport";
import SingleReportResults from "../Reports/MemberReports/ReportResults";

// style imports
import { baseURL, axiosWithAuth } from "../../config/axiosWithAuth";
import { Spinner, Intent } from "@blueprintjs/core";

// this component houses all things reports
class ReportsDash extends Component {
  state = {
    message: "",
    reports: [],
    isLoading: true
  };

  render() {
    if (this.state.isLoading) {
      return <Spinner intent={Intent.PRIMARY} />;
    }
    return (
      <div
        className={
          this.props.location.pathname === "/slackr/dashboard"
            ? "ReportsOnDash"
            : "ReportSingle"
        }
      >
        <Switch>
          <Route
            exact
            path="/slackr/dashboard"
            render={props => (
              <Reports
                {...props}
                role={this.props.role}
                reports={this.state.reports}
                archiveReport={this.archiveReport}
                getReports = {this.getReports}
              />
            )}
          />
          <Route
            exact
            path="/slackr/dashboard/reports/choose"
            render={props => (
              <ChooseReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/slackr/dashboard/reports/new"
            render={props => (
              <CreateReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/slackr/dashboard/reports/createSentiment"
            render={props => (
              <CreateSentiment
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/slackr/dashboard/reports/:reportId/edit"
            render={props => (
              <EditReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/slackr/dashboard/reports/:reportId"
            render={props => (
              <SingleReportResults {...props} getReports={this.getReports} />
            )}
          />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    // call to get reports and stick them in state
    this.getReports();
  }

  getReports = () => {
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
  };

  // archiveReport = id => {
  //   const endpoint = `${baseURL}/reports/${id}`;
  //   console.log(id)
  //   const updatedReport = {
  //     active: false
  //   };
  //   axiosWithAuth()
  //     .put(endpoint, updatedReport)
  //     .then(res => {
  //       this.getReports();
  //     })
  //     .catch(err => console.log(err));
  // };

  setResponseAsState = reports => {
    this.setState({
      reports: reports
    });
  };
}

export default ReportsDash;
