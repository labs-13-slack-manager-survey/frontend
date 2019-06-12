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
    console.log(this.state);
    // Bar Chart ---------
    this.props.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/responses/sentimentAvg/${report.id}`)
        .then(res => {
          this.state.results.push(res.data[0].average);
        })
        .catch(err => console.log(err));
    });
    console.log(this.state.results);

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
            label: "Sentiment Average",
            data: [],
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
                max: 5
              }
            }
          ]
        }
      }
    });
    this.addData(barChart, this.state.results);
  }

  addData = (chart, results) => {
    chart.data.datasets.forEach(dataset => {
      dataset.data = [1, 2, 3];
    });
    chart.update();
  };

  render() {
    return (
      <div>
        <canvas id="chart" />
      </div>
    );
  }
}

export default SentimentChart;
