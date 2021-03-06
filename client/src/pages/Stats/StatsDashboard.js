import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import moment from "moment";

import PageTitle from "../../components/PageTitle";
import SummaryBox from "../../components/SummaryBox";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from "@material-ui/core";

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
      dataType: "",
      clicked: ""
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

  generateLabels = num => {
    if (this.state.dataType === "responseRate") {
      let generatedDates = [];
      for (let i = num; i > 0; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i + 1);
        date = moment(date).format("l");
        generatedDates.push(date);
      }
      this.setState({
        labels: generatedDates
      });
    } else if (this.state.dataType === "sentimentAverage") {
      let reportNames = [];
      this.state.reports.forEach(report => {
        reportNames.push(report.reportName);
      });
      this.setState({
        labels: reportNames
      });
    }
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
        if (this.state.dataType === "responseRate") {
          let today = moment(Date.now()).format("l");
          this.setState({
            labels: [today]
          });
        } else if (this.state.dataType === "sentimentAverage") {
          this.generateLabels(1);
        }

        break;
      case "week":
        this.generateLabels(7);
        break;
      case "month":
        this.generateLabels(30);
        break;
      case "quarter":
        this.generateLabels(90);
        break;
      case "year":
        this.generateLabels(365);
        break;
      default:
        console.log("default");
    }

    this.setState({
      clicked: "clicked"
    });
  };

  render() {
    if (this.state.reports.length === 0) {
      return (
        <div>
          <p>No surveys yet! Add a report to see stats.</p>
        </div>
      );
    }
    if (this.state.dataType === "") {
      // REFACTOR TO BE DRY
      return (
        <div className="dashboard-view">
          <div className="view">
            <PageTitle title="Stats Dashboard" />
            <div className="summary-boxes">
              <SummaryBox
                title="no. of team members"
                content={this.state.users.length}
              />
              <SummaryBox
                title="total surveys responses"
                content={this.state.users.length}
              />
              <SummaryBox
                title="total surveys scheduled"
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
                  <MenuItem value={"day"}>Today</MenuItem>
                  <MenuItem value={"week"}>Last 7 Days</MenuItem>
                  <MenuItem value={"month"}>Last 30 Days</MenuItem>
                  <MenuItem value={"quarter"}>Last 90 Days</MenuItem>
                  <MenuItem value={"year"}>Last 365 Days</MenuItem>
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.setLabels}
                style={{ margin: "20px" }}
              >
                Generate Graph
              </Button>
            </form>
            <p>Select options to see graph.</p>
          </div>
          <div className="sidebar" />
        </div>
      );
    }

    return (
      <div className="dashboard-view">
        <div className="view">
          <PageTitle title="Stats Dashboard" />
          <div className="summary-boxes">
            <SummaryBox
              title="no. of team members"
              content={this.state.users.length}
            />
            <SummaryBox
              title="total surveys responses"
              content={this.state.users.length}
            />
            <SummaryBox
              title="total surveys scheduled"
              content={this.state.reports.length}
            />
          </div>
          <form
            autoComplete="off"
            className="form"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {this.state.clicked === "" ? (
              <>
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
                    <MenuItem value={"day"}>Today</MenuItem>
                    <MenuItem value={"week"}>Last 7 Days</MenuItem>
                    <MenuItem value={"month"}>Last 30 Days</MenuItem>
                    <MenuItem value={"quarter"}>Last 90 Days</MenuItem>
                    <MenuItem value={"year"}>Last 365 Days</MenuItem>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.setLabels}
                  style={{ margin: "20px" }}
                >
                  Generate Graph
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={e => window.location.reload()}
                style={{ margin: "20px" }}
              >
                New Graph
              </Button>
            )}
          </form>

          <ChartOptions
            reports={this.state.reports}
            data={this.state.data}
            labels={this.state.labels}
            dataType={this.state.dataType}
            filterBy={this.state.filterBy}
          />
        </div>
        <div className="sidebar" />
      </div>
    );
  }
}

export default StatsDashboard;
