import React, { Component } from "react";

import SentimentChart from "./SentimentChart";
import SentimentAvg from "./SentimentAvg";
import DataSquare from "./DataSquare";
import TodayPoll from "./TodayPoll";
import PollCalendar from "./PollCalendar";

import "./StatsDashboard.css";

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
        console.log(res);
        this.setState({
          reports: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="dashboard">
        <h2 style={{ marginBottom: "40px" }}>Stats Dashboard</h2>
        <div className="mainDashboard">
          <SentimentChart />
          <SentimentAvg />
          <div className="dataSquares">
            {/* Dummy Data */}
            <DataSquare text="Number of Teams" data="8" />
            <DataSquare text="Total Poll Responses" data="1715/1824" />
            <DataSquare text="Total Response Rate" data="76%" />
          </div>
        </div>
        <div className="sideDashboard">
          <TodayPoll average={3.8} />
          <PollCalendar />
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
