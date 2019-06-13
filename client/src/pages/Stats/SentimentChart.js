import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

let barChart = {};

class SentimentChart extends Component {
  state = {
    results: [],
    labels: []
  };

  componentDidMount() {
    console.log(this.props.data);
    // Labels
    this.props.reports.forEach(report => {
      this.state.labels.push(report.reportName);
    });

    // Chart -------------------------
    const ctx = document.getElementById("chart").getContext("2d");
    barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: "Response Rate",
            data: this.props.data,
            backgroundColor: "#055EBE"
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas id="chart" />
      </div>
    );
  }
}

export default SentimentChart;
