import React, { Component } from "react";
import Chart from "chart.js";

import "./SentimentChart.css";

class SentimentChart extends Component {
  componentDidMount() {
    // Chart -------------------------
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.label,
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
                max: this.props.max
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
