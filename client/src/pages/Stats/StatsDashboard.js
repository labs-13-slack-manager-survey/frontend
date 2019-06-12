import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";
import SentimentAvg from "./SentimentAvg";
import PageTitle from '../../components/PageTitle'
import TodayPoll from "./TodayPoll";
import PollCalendar from "../../components/PollCalendar";
import SummaryBox from "../../components/SummaryBox";

import CircularProgress from "@material-ui/core/CircularProgress";

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
        <PageTitle 
          title = "Stats Dashboard"
        />
          <SentimentChart />
          <SentimentAvg reports={this.state.reports} />
          <div className="dataSquares">
            {/* Dummy Data */}
            <SummaryBox title="Number of Teams" content="8" />
            <SummaryBox title="Total Poll Responses" content="1715/1824" />
            <SummaryBox title="Total Response Rate" content="76%" />
          </div>
        </div>
        <div className="sidebar">
          <PollCalendar />
          <TodayPoll
            reports={this.state.reports}
            lastReport={this.state.reports[this.state.reports.length - 1]}
          />
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
