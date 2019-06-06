import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentChart extends Component {
  constructor() {
    super();
    this.state = {
      reports: []
    };
  }

  chartRef = React.createRef();

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
        <canvas id="sentimentChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default SentimentChart;
