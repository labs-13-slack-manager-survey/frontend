import React, { Component } from "react";
import Chart from "chart.js";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import "../../components/circleProgress.css";

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
            backgroundColor: ["#0069D2", "rgb(231, 254, 255)"]
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
      <div className="circle-graph" style={{ padding: "10px" }}>
        <h3>Today's Poll</h3>

        <canvas id="submittedPercent" ref={this.chartRef} />

        <div style={{ marginTop: "20px" }} className="today-date">
          6/12/19
        </div>
        {this.state.reports.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <p style={{ textAlign: "center", margin: "10px 0" }}>
            Sentiment Average: {this.state.reports[0].average}
          </p>
        )}
        {this.state.reports.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <p
            style={{
              textAlign: "center",
              margin: "10px 0"
            }}
          >
            Completed: 80%
          </p>
        )}
      </div>
    );
  }
}

export default TodayPoll;
