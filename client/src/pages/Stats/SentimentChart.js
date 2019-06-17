import React, { Component } from "react";
import Chart from "chart.js";
import moment from "moment";
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

// Last week dates array.
let lastWeek = [];
let lastMonth = [];
let lastQuarter = [];
let lastYear = [];

class SentimentChart extends Component {
  state = {
    results: [],
    labels: [],
    filterBy: ""
  };

  componentDidMount() {
    // Labels
    // this.props.reports.forEach(report => {
    //   this.state.labels.push(report.reportName);
    // });

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

  generateWeekDates = () => {
    for (let i = 7; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      date = moment(date).format("l");
      lastWeek.push(date);
    }
    this.setState({
      labels: lastWeek
    });
    console.log(this.state.filterBy);
  };

  generateMonthDates = () => {
    for (let i = 30; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      date = moment(date).format("l");
      lastMonth.push(date);
    }
    this.setState({
      labels: lastMonth
    });
    console.log(this.state.filterBy);
  };

  generateQuarterDates = () => {
    for (let i = 30; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      date = moment(date).format("l");
      lastQuarter.push(date);
    }
    this.setState({
      labels: lastQuarter
    });
    console.log(this.state.filterBy);
  };

  setLabels = e => {
    e.preventDefault();
    switch (this.state.filterBy) {
      case "day":
        let today = moment(Date.now()).format("l");
        console.log(today);
        this.setState({
          labels: [today]
        });
        break;
      case "week":
        this.generateWeekDates();
        break;
      case "month":
        this.generateMonthDates();
        break;
      case "quarter":
        break;
      case "year":
        break;
    }
    console.log(this.state);
  };

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
              <button onClick={this.setLabels} style={{ margin: "20px" }}>
                Filter
              </button>
            </FormControl>
          </form>
        </div>
        <canvas id="chart" />
      </div>
    );
  }
}

export default SentimentChart;
