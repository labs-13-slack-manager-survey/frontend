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

import CircleProgress from '../../components/circleProgress.js';

import "./StatsDashboard.css";

const URL = process.env.REACT_APP_BASE_URL;

class StatsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      reports: [],
      responses: [],
      barLabels: [],
      barData: [],
      numbers: []
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
      .then(() => {
        this.getNumbers();
      })
      .catch(err => console.log(err));
  }

  getNumbers = () => {
    this.state.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/responses/sentimentAvg/${report.id}`)
        .then(res => {
          this.setState({
            numbers: [...this.state.numbers, res.data[0].average]
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
          {this.state.numbers.length === this.state.reports.length && (
            <SentimentChart
              reports={this.state.reports}
              numbers={this.state.numbers}
            />
          )}

          <div style={{ marginTop: "50px" }}>
            <TableHeader
              column1={"Poll Name"}
              column2={"Date Created"}
              column3={"Schedule"}
              column4={"Sentiment Avg"}
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
          title = "Today's Polls"
//  minorFix
          percentComplete = "0.8"
          />

  
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
