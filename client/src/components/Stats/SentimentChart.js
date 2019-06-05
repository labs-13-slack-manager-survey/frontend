import React, { Component } from "react";
import Chart from "chart.js";

class SentimentChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      // Currently just hard-coded dummy data
      data: {
        labels: [
          "6/3/19",
          "6/4/19",
          "6/5/19",
          "6/6/19",
          "6/7/19",
          "6/8/19",
          "6/9/19"
        ],
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
        <h2>Chart</h2>
        <canvas id="sentimentChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default SentimentChart;
