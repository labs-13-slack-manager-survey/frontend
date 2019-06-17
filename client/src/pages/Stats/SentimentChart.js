import React, { Component } from "react";
import Chart from "chart.js";
import { makeStyles } from "@material-ui/core/styles";
import {
  OutlinedInput,
  FilledInput,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select
} from "@material-ui/core";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import "./SentimentChart.css";
import { flexbox } from "@material-ui/system";

const URL = process.env.REACT_APP_BASE_URL;

let barChart = {};

class SentimentChart extends Component {
  state = {
    results: [],
    labels: [],
    filterBy: "week"
  };

  componentDidMount() {
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <form
            autoComplete="off"
            className="form"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <FormControl className="formControl">
              <InputLabel
                className="inputLabel"
                style={{ marginBottom: "20px" }}
              >
                Filter By
              </InputLabel>
              <Select
                value={this.state.filterBy}
                style={{ marginTop: "20px" }}
                name="filterBy"
                onChange={this.handleChange}
                className="select"
              >
                <MenuItem value={"day"}>Day</MenuItem>
                <MenuItem value={"week"}>Week</MenuItem>
                <MenuItem value={"month"}>Month</MenuItem>
                <MenuItem value={"quarter"}>Quarter</MenuItem>
                <MenuItem value={"year"}>Year</MenuItem>
              </Select>
            </FormControl>
          </form>
        </div>
        <canvas id="chart" />
      </div>
    );
  }
}

export default SentimentChart;
