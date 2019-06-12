import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";
import SentimentAvg from "./SentimentAvg";
import PageTitle from "../../components/PageTitle";
import TodayPoll from "./TodayPoll";
import PollCalendar from "../../components/PollCalendar";
import SummaryBox from "../../components/SummaryBox";
import $ from "jquery";
import TableDisplay from "../../components/TableDisplay";
import TableHeader from "../../components/TableHeader";

import CircularProgress from "@material-ui/core/CircularProgress";
import CircleProgress from "../../components/circleProgress.js";

import "./StatsDashboard.css";

const URL = process.env.REACT_APP_BASE_URL;

class StatsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      reports: [],
      responses: [],
      barLabels: [],
      barData: []
    };
  }

  componentDidMount() {
    axiosWithAuth()
      .get(`${URL}/reports`)
      .then(res => {
        const sentimentReports = res.data.reports.filter(report => {
          if (report.isSentiment) {
            return report;
          }
        });
        this.setState({
          reports: sentimentReports
        });
      })
      .catch(err => console.log(err));
  }

  viewStats = id => {};

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
    if (this.state.reports.length === 0) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="dashboard-view">
        <div className="view">
          <PageTitle title="Stats Dashboard" />
          <SentimentChart reports={this.state.reports} />
          <TableHeader
            column1={"Poll Name"}
            column2={"Date Created"}
            column3={"Schedule"}
            column4={"Total Responses"}
          />
          {this.state.reports.map(report => (
            <TableDisplay
              content1={report.reportName}
              report={report}
              role={"test"}
              archiveReport={this.archiveReport}
              archiveModal={false}
              // ConsoleCheck=
            />
          ))}
          {/* <SentimentAvg
            reports={this.state.reports}
            viewStats={this.viewStats}
          /> */}
          <div className="dataSquares">
            <SummaryBox title="Number of Teams" content="8" />
            <SummaryBox title="Total Poll Responses" content="1715/1824" />
            <SummaryBox title="Total Response Rate" content="76%" />
          </div>
        </div>
        <div className="sidebar">
          <PollCalendar />
          <CircleProgress title={"Progress"} percentComplete={".8"} />
          {/* <TodayPoll
            reports={this.state.reports}
            lastReport={this.state.reports[this.state.reports.length - 1]}
          /> */}
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
