import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";

import { Button, Dialog, DialogTitle, Slide } from "@material-ui/core";

import Slack from "../Slack/Slack.js";
import "./reports.css";
import TableHeader from "../../components/TableHeader";
import TableDisplay from "../../components/TableDisplay";

// Container for all reports including title
// Parent component = ReportsDash.js in '/pages/Dashboard/ReportsDash'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Reports extends Component {
  state = {
    slackModal: false,
    archiveModal: false
  };

  slackAuthCheck = e => {
    e.preventDefault();
    const endpoint = `${baseURL}/slack/channels`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        if (res.status !== 200) {
          console.log("56");
          this.setState({
            slackModal: true
          });
        } else {
          this.props.history.push("dashboard/reports/choose");
        }
      })
      .catch(err => {
        this.setState({
          slackModal: true
        });
        console.log(err);
      });
  };

  handleClose = () => {
    this.setState({
      slackModal: false
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
    //const { stepsEnabled, steps, initialStep } = this.state;
    const activeReports = this.props.reports.filter(report => report.active);
    const activeReportsReverse = activeReports.reverse();

    return (
      <div className="user-reports-container">
        <header className="reports-header">
          <Dialog
            open={this.state.slackModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Want to add your Slack team to this report?"}
              <Button onClick={() => this.handleClose()}>x</Button>
            </DialogTitle>
            <Slack />

            <Button
              onClick={() =>
                this.props.history.push("/slackr/dashboard/reports/choose")
              }
            >
              Skip
            </Button>
          </Dialog>
        </header>
        <div>
          {/* passing reports from state to individual components */}
          <TableHeader
            column1="Survey Name"
            column2="Date Created"
            column3="Schedule"
            column4="Total Responses"
          />
          {activeReportsReverse.length === 0 ? (
            <div> no surveys yet! Add a Survey to get started </div>
          ) : null}
          {activeReportsReverse.map(report => (
            <TableDisplay
              content1={report.reportName}
              report={report}
              role={this.props.role}
              archiveReport={this.archiveReport}
              archiveModal={this.state.archiveModal}
              ConsoleCheck={this.ConsoleCheck}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Reports;
