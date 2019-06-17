import React, { Component } from "react";
import Chart from "chart.js";
import moment from "moment";

import "./SentimentChart.css";

class SentimentChart extends Component {
  state = {
    results: [],
    labels: [],
    filterBy: ""
  };

  componentDidMount() {
    // Chart -------------------------
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
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

  generateDates = num => {
    let generatedDates = [];
    for (let i = num; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      date = moment(date).format("l");
      generatedDates.push(date);
    }
    this.setState({
      labels: generatedDates
    });
  };

  setLabels = e => {
    e.preventDefault();
    switch (this.state.filterBy) {
      case "day":
        let today = moment(Date.now()).format("l");
        this.setState({
          labels: [today]
        });
        break;
      case "week":
        this.generateDates(7);
        break;
      case "month":
        this.generateDates(30);
        break;
      case "quarter":
        this.generateDates(90);
        break;
      case "year":
        this.generateDates(365);
        break;
    }
    console.log(this.state.labels);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
