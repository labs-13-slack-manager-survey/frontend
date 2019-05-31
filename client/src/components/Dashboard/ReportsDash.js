import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// component imports
import ChooseReport from "../Reports/ModifyReports/ChooseReport";
import CreateReport from "../Reports/ModifyReports/CreateReport";
import CreatePoll from "../Reports/ModifyReports/CreatePoll";
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
          this.props.location.pathname === "/dashboard"
            ? "ReportsOnDash"
            : "ReportSingle"
        }
      >
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={props => (
              <Reports
                {...props}
                role={this.props.role}
                reports={this.state.reports}
                archiveReport={this.archiveReport}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/reports/choose"
            render={props => (
              <ChooseReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/reports/new"
            render={props => (
              <CreateReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/reports/createPoll"
            render={props => (
              <CreatePoll
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/reports/:reportId/edit"
            render={props => (
              <EditReport
                {...props}
                setResponseAsState={this.setResponseAsState}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/reports/:reportId"
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

  archiveReport = id => {
    const endpoint = `${baseURL}/reports/${id}`;
    const updatedReport = {
      active: false
    };
    axiosWithAuth()
      .put(endpoint, updatedReport)
      .then(res => {
        this.getReports();
      })
      .catch(err => console.log(err));
  };

  setResponseAsState = reports => {
    this.setState({
      reports: reports
    });
  };
}

export default ReportsDash;
