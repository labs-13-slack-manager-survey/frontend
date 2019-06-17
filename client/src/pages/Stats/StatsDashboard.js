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
      barData: [],
      recentResponseRate: null,
      users: []
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
        this.setUsers();
      })
      .then(() => {
        this.getResponseRate();
        this.setRecentResponse();
      })
      .catch(err => console.log(err));
  }

  setRecentResponse = () => {
    let recentReport = this.state.reports[this.state.reports.length - 1];
    axiosWithAuth()
      .get(`${URL}/reports/submissionRate/${recentReport.id}`)
      .then(res => {
        this.setState({
          recentResponseRate: res.data.historicalSubmissionRate
        });
      })
      .catch(err => console.log(err));
  };

  getResponseRate = () => {
    this.state.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/reports/submissionRate/${report.id}`)
        .then(res => {
          this.setState({
            barData: [...this.state.barData, res.data.historicalSubmissionRate]
          });
        })
        .catch(err => console.log(err));
    });
  };

  setUsers = () => {
    axiosWithAuth()
      .get(`${baseURL}/users/team`)
      .then(res => {
        console.log(res.data.users);
        this.setState({ users: res.data.users });
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
            <SummaryBox
              title="no. of team members"
              content={this.state.users.length}
            />

            <SummaryBox
              title="total poll responses"
              content={this.state.users.length}
            />

            <SummaryBox
              title="total polls scheduled"
              content={this.state.reports.length}
            />
          </div>
          {this.state.barData.length === this.state.reports.length && (
            <SentimentChart
              reports={this.state.reports}
              data={this.state.barData}
            />
          )}
        </div>
        <div className="sidebar" />
      </div>
    );
  }
}

export default StatsDashboard;
