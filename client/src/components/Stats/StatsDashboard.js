import React, { Component } from "react";

import SentimentChart from "./SentimentChart";
import SentimentAvg from "./SentimentAvg";
import DataSquare from "./DataSquare";
import TodayPoll from "./TodayPoll";
import Calendar from "./Calendar";

import "./StatsDashboard.css";

class StatsDashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h2>Stats Dashboard</h2>
        <SentimentChart />
        <SentimentAvg />
        <DataSquare />
        <TodayPoll />
        <Calendar />
      </div>
    );
  }
}

export default StatsDashboard;
