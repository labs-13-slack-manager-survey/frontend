import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import moment from "moment";

import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import SentimentChart from "./SentimentChart";

const URL = process.env.REACT_APP_BASE_URL;

export default class ChartOptions extends Component {
  state = {
    data: [],
    labels: [],
    filterBy: ""
  };

  componentDidMount() {
    this.getResponseRate();
  }

  getResponseRate = () => {
    this.props.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/reports/submissionRate/${report.id}`)
        .then(res => {
          this.setState({
            data: [...this.state.data, res.data.historicalSubmissionRate]
          });
        })
        .catch(err => console.log(err));
    });
  };

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
    console.log(this.state);
    return (
      <div>
        <form
          autoComplete="off"
          className="form"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <FormControl className="formControl">
            <InputLabel className="inputLabel" style={{ marginBottom: "20px" }}>
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
        {console.log(this.state.labels)}
        {this.state.labels > 0 ? (
          <SentimentChart data={this.state.data} labels={this.state.labels} />
        ) : (
          <p>Set Options</p>
        )}
      </div>
    );
  }
}
