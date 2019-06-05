import React, { Component } from "react";
import Chart from "chart.js";

class TodayPoll extends Component {
  constructor() {
    super();
    this.state = {};
  }

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "pie",
      // Currently just hard-coded dummy data
      data: {
        labels: ["Submitted", "Unsubmitted"],
        datasets: [
          {
            label: "% Submitted",
            data: [4, 1],
            backgroundColor: ["green", "red"]
          }
        ]
      },
      options: {}
    });
  }

  render() {
    return (
      <div>
        <h2>Today's Poll</h2>
        <h4 style={{ textAlign: "center", margin: "20px 0" }}>
          Sentiment Average: {this.props.average}
        </h4>
        <canvas id="submittedPercent" ref={this.chartRef} />
      </div>
    );
  }
}

export default TodayPoll;
