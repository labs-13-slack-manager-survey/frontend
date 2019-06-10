import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";
import SentimentAvg from "./SentimentAvg";
import TodayPoll from "./TodayPoll";
import PollCalendar from "./PollCalendar";
import SummaryBox from "../../components/SummaryBox";

import "./StatsDashboard.css";

const URL = process.env.REACT_APP_BASE_URL;

class StatsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    axiosWithAuth()
      .get(`${URL}/reports`)
      .then(res => {
        console.log(res.data.reports);
        const sentimentReports = res.data.reports.filter(report => {
          if (report.isSentiment) {
            return report;
          }
        });
        console.log(sentimentReports);
        this.setState({
          reports: sentimentReports
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.reports.length === 0) {
      return <div className="dashboard">There are no stats to report.</div>;
    }

    return (
      <div className="dashboard">
        <h2 style={{ marginBottom: "40px" }}>Stats Dashboard</h2>
        <div className="mainDashboard">
          <SentimentChart />
          <SentimentAvg reports={this.state.reports} />
          <div className="dataSquares">
            {/* Dummy Data */}
            <SummaryBox title="Number of Teams" content="8" />
            <SummaryBox title="Total Poll Responses" content="1715/1824" />
            <SummaryBox title="Total Response Rate" content="76%" />
          </div>
        </div>
        <div className="sideDashboard">
          <TodayPoll
            reports={this.state.reports}
            lastReport={this.state.reports[this.state.reports.length - 1]}
          />
          <PollCalendar />
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
