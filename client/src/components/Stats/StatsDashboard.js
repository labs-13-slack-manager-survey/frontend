import React, { Component } from "react";
import { Route } from "react-router-dom";

import Chart from "./Chart";
import SentimentAvg from "./SentimentAvg";
import DataSquare from "./DataSquare";
import TodayPoll from "./TodayPoll";
import Calendar from "./Calendar";

class StatsDashboard extends Component {
  render() {
    return (
      <div>
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
