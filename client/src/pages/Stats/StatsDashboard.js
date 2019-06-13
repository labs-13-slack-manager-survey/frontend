import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";
import PageTitle from "../../components/PageTitle";
import TodayPoll from "./TodayPoll";
import PollCalendar from "../../components/PollCalendar";
import SummaryBox from "../../components/SummaryBox";
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
        // const sentimentReports = res.data.reports.filter(report => {
        //   if (report.isSentiment) {
        //     return report;
        //   }
        // });
        this.setState({
          reports: res.data.reports
        });
      })
      .then(() => {
        this.getResponseRate();
      })
      .catch(err => console.log(err));
  }

  getResponseRate = () => {
    this.state.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/reports/submissionRate/${report.id}`)
        .then(res => {
          console.log(res.data.historicalSubmissionRate);
          this.setState({
            barData: [...this.state.barData, res.data.historicalSubmissionRate]
          });
        })
        .catch(err => console.log(err));
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
          <div className="dataSquares">
            <SummaryBox title="Number of Teams" content="8" />
            <SummaryBox title="Total Poll Responses" content="1715/1824" />
            <SummaryBox title="Total Response Rate" content="76%" />
          </div>
          {this.state.barData.length === this.state.reports.length && (
            <SentimentChart
              reports={this.state.reports}
              data={this.state.barData}
            />
          )}

          <div style={{ marginTop: "50px" }}>
            <TableHeader
              column1={"Report Name"}
              column2={"Date Created"}
              column3={"Schedule"}
              column4={"Response Rate"}
            />
          </div>
          {this.state.reports.map(report => (
            <TableDisplay
              key={report.id}
              content1={report.reportName}
              report={report}
              role={"test"}
              archiveReport={this.archiveReport}
              archiveModal={false}
            />
          ))}
        </div>
        <div className="sidebar">
          {/* <PollCalendar /> */}

          <CircleProgress
            title="Today's Polls"
            //  minorFix
            percentComplete="0.8"
          />
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
