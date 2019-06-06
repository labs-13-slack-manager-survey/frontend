import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import { Link } from "react-router-dom";

import {
  Fab,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  Icon
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Slack from "../Slack/Slack";
import SingleReport from "./SingleReport";
import "./reports.css";

// Container for all reports including title
// Parent component = ReportsDash.js in '/components/Dashboard/ReportsDash'

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

  ConsoleCheck = (id) => {
    console.log(id)
  }

  handleClose = () => {
    this.setState({
      slackModal: false
    });
  };

  archiveReport = id => {
    console.log('archive report')
    const endpoint = `${baseURL}/reports/${id}`;
    console.log(id)
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


  handleArchive = () => {
    this.setState({
      archiveModal: !this.state.archiveModal
    });
  };

  render() {
    //const { stepsEnabled, steps, initialStep } = this.state;
    const activeReports = this.props.reports.filter(report => report.active);

    return (
      <div className="user-reports-container">
        <header className="reports-header">
          <Typography variant="h3">Your Reports</Typography>
          <div className="reports-header-buttons">
            <Link
              style={
                this.props.role !== "admin"
                  ? { cursor: "initial" }
                  : { cursor: "pointer" }
              }
              to={
                this.props.role !== "admin"
                  ? "/slackr/dashboard"
                  : "/slackr/dashboard/reports/choose"
              }
            >
              <Fab
                color="primary"
                aria-label="Add"
                size="large"
                disabled={this.props.role !== "admin" ? true : false}
                onClick={this.slackAuthCheck}
              >
                {this.props.role !== "admin" ? <Icon>lock</Icon> : <AddIcon />}
              </Fab>
            </Link>
          </div>
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
          {activeReports.map(report => (
            <SingleReport
              role={this.props.role}
              key={report.id}
              report={report}
              archiveReport={this.archiveReport}
              archiveModal={this.state.archiveModal}
              handleArchive={this.handleArchive}
              ConsoleCheck = {this.ConsoleCheck}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Reports;
