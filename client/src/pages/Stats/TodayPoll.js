import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class TodayPoll extends Component {
  constructor() {
    super();
    this.state = {
      reports: []
    };
  }

  chartRef = React.createRef();

  componentDidMount() {
    axiosWithAuth()
      .get(`${URL}/responses/sentimentAvg/${this.props.lastReport.id}`)
      .then(res => {
        this.setState({
          reports: res.data
        });
      })
      .catch(err => console.log(err));

    // Creates Doughnut Chart
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "doughnut",
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
      options: {
        animation: {
          animateRotate: true
        }
      }
    });
  }

  render() {
    return (
      <div>
        <h2 style={{ margin: "0" }}>Today's Poll</h2>
        {this.state.reports.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <h4 style={{ textAlign: "center", margin: "20px 0" }}>
            Sentiment Average: {this.state.reports[0].average}
          </h4>
        )}

        <canvas id="submittedPercent" ref={this.chartRef} />
      </div>
    );
  }
}

export default TodayPoll;
