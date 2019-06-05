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
          <TodayPoll />
          <Calendar />
        </div>
      </div>
    );
  }
}

export default StatsDashboard;
