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
import TableHeader from '../../components/TableHeader'
import TableDisplay from '../../components/TableDisplay'



// Container for all reports including title
// Parent component = ReportsDash.js in '/pages/Dashboard/ReportsDash'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Reports extends Component {
  state = {
    slackModal: false,
    archiveModal: false,
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

  // ConsoleCheck = (id) => {
  //   console.log(id)

  // }

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

    return (
      <div className="user-reports-container">
        <header className="reports-header">

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
              {/* <Fab
                color="primary"
                aria-label="Add"
                size="large"
                disabled={this.props.role !== "admin" ? true : false}
                onClick={this.slackAuthCheck}
              > */}
                {/* {this.props.role !== "admin" ? <Icon>lock</Icon> : <AddIcon />} */}
              {/* </Fab> */}
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
          <TableHeader 
              column1 = "Report Name"
              column2 = "Date Created"
              column3 = "Schedule" 
              column4 = "Total Responses"/>
          {activeReports.map(report => (
              // 		<TableDisplay 
              //       column1 = "Report Name"
              //       column2 = "Date Created"
              //       column3 = "Schedule" 
              //       column4 = "Total Responses"
              // content1 = {report.ReportName}/>
              <TableDisplay 
              content1 = {report.reportName}
              report = {report}
              role={this.props.role}
              archiveReport={this.archiveReport}
              archiveModal={this.state.archiveModal}
              ConsoleCheck = {this.ConsoleCheck}
              />
              // <SingleReport
              //   role={this.props.role}
              //   key={report.id}
              //   report={report}
              //   archiveReport={this.archiveReport}
              //   archiveModal={this.state.archiveModal}
              //   ConsoleCheck = {this.ConsoleCheck}
              // />
            
          ))}
        </div>
      </div>
    );
  }
}

export default Reports;
