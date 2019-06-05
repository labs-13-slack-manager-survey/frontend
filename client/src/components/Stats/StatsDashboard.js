import React, { Component } from "react";

import Chart from "./Chart";
import SentimentAvg from "./SentimentAvg";
import DataSquare from "./DataSquare";
import TodayPoll from "./TodayPoll";
import Calendar from "./Calendar";

import "./StatsDashboard.css";

class StatsDashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h2>Stats</h2>
        <Chart />
        <SentimentAvg />
        <DataSquare />
        <TodayPoll />
        <Calendar />
      </div>
    );
  }
}

export default StatsDashboard;
