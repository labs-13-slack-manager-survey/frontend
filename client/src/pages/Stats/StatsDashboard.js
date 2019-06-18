import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import moment from "moment";

import PageTitle from "../../components/PageTitle";
import SummaryBox from "../../components/SummaryBox";

import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./StatsDashboard.css";
import ChartOptions from "./ChartOptions";

const URL = process.env.REACT_APP_BASE_URL;

class StatsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      reports: [],
      users: [],
      data: [],
      labels: [],
      filterBy: "",
      dataType: ""
    };
  }

  componentDidMount() {
    axiosWithAuth()
      .get(`${URL}/reports`)
      .then(res => {
        this.setState({
          reports: res.data.reports
        });
        this.setUsers();
      })
      .then(() => {
        this.setRecentResponse();
      })
      .catch(err => console.log(err));
  }

  setRecentResponse = () => {
    let recentReport = this.state.reports[this.state.reports.length - 1];
    axiosWithAuth()
      .get(`${URL}/reports/submissionRate/${recentReport.id}`)
      .then(res => {
        this.setState({
          recentResponseRate: res.data.historicalSubmissionRate
        });
      })
      .catch(err => console.log(err));
  };

  setUsers = () => {
    axiosWithAuth()
      .get(`${baseURL}/users/team`)
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => console.log(err));
  };

  archiveReport = id => {
    const endpoint = `${baseURL}/reports/${id}`;
    const updatedReport = {
      active: false
    };
    axiosWithAuth()
      .put(endpoint, updatedReport)
      .then(res => {
        this.props.getReports();
        this.handleArchive();
      })
      .catch(err => console.log(err));
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
    console.log(this.state);
  };

  render() {
    if (this.state.reports.length === 0) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="dashboard-view">
        <div className="view">
          <PageTitle title="Stats Dashboard" />
          <div className="dataSquares">
            <SummaryBox
              title="no. of team members"
              content={this.state.users.length}
            />
            <SummaryBox
              title="total poll responses"
              content={this.state.users.length}
            />
            <SummaryBox
              title="total polls scheduled"
              content={this.state.reports.length}
            />
          </div>
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
            <FormControl className="formControl">
              <InputLabel
                className="inputLabel"
                style={{ marginBottom: "20px" }}
              >
                Pick Data
              </InputLabel>

              <Select
                value={this.state.dataType}
                style={{ marginTop: "20px" }}
                name="dataType"
                onChange={this.handleChange}
                className="select"
              >
                <MenuItem value={"responseRate"}>Response Rate</MenuItem>
                <MenuItem value={"sentimentAverage"}>
                  Sentiment Average
                </MenuItem>
              </Select>
            </FormControl>
            <button onClick={this.setLabels} style={{ margin: "20px" }}>
              View Graph
            </button>
          </form>
          <ChartOptions
            reports={this.state.reports}
            data={this.state.data}
            labels={this.state.labels}
          />
        </div>
        <div className="sidebar" />
      </div>
    );
  }
}

export default StatsDashboard;
