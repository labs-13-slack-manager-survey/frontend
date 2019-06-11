import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";
import CircularProgress from "@material-ui/core/CircularProgress";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentChart extends Component {
  state = {
    results: [],
    labels: []
  };

  chartRef = React.createRef();

  componentDidMount() {
    console.log(this.state);
    // Bar Chart ---------
    let averages = [];
    this.props.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/responses/sentimentAvg/${report.id}`)
        .then(res => {
          averages.push(res.data[0].average);
        })
        .catch(err => console.log(err));
    });
    this.setState({
      results: averages
    });
    console.log(this.state.results);

    // Labels
    this.props.reports.forEach(report => {
      this.state.labels.push(report.reportName);
    });

    // Chart -------------------------
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: "Sentiment Average",
            data: this.state.results,
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
