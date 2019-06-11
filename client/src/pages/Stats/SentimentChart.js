import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentChart extends Component {
  state = {
    responses: this.props.responses,
    chartLabels: [],
    chartData: [],
    reportNames: []
  };

  chartRef = React.createRef();

  componentDidMount() {
    this.props.reports.forEach(report => {
      this.state.reportNames.push(report.reportName);
    });

    // Chart -------------------------
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      // Currently just hard-coded dummy data
      data: {
        labels: this.state.reportNames,
        datasets: [
          {
            label: "Sentiment Average",
            data: [3.3, 3.7, 4.8, 2.4, 5, 2.9, 3.5],
            backgroundColor: [
              "red",
              "green",
              "blue",
              "magenta",
              "purple",
              "orange",
              "teal"
            ]
          }
        ]
      },
      options: {}
    });
  }

  render() {
    return (
      <div>
        <canvas id="sentimentChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default SentimentChart;
