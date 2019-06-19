import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";
import moment from "moment";

import SentimentChart from "./SentimentChart";

const URL = process.env.REACT_APP_BASE_URL;

export default class ChartOptions extends Component {
  state = {
    data: [],
    sortedReports: []
  };

  componentDidMount() {
    this.sortResponses();
  }

  sortResponses = () => {
    let daySortedReports = [];

    this.props.reports.forEach(report => {
      report.created_at = moment(report.created_at).format("l");
    });

    axiosWithAuth()
      .get(`${URL}/reports/submissionRate/${this.props.reports[0].id}`)
      .then(res => {
        let report = {
          report: this.props.reports[0],
          submissionRate: res.data.historicalSubmissionRate
        };
        daySortedReports.push([report]);
      })
      .then(() => {
        let arrIndex = 0;
        for (let i = 1; i < this.props.reports.length; i++) {
          if (
            this.props.reports[i].created_at ===
            daySortedReports[arrIndex][0].report.created_at
          ) {
            axiosWithAuth()
              .get(`${URL}/reports/submissionRate/${this.props.reports[i].id}`)
              .then(res => {
                let report = {
                  report: this.props.reports[i],
                  submissionRate: res.data.historicalSubmissionRate
                };
                daySortedReports[arrIndex].push(report);
              })
              .catch(err => console.log(err));
          } else {
            axiosWithAuth()
              .get(`${URL}/reports/submissionRate/${this.props.reports[i].id}`)
              .then(res => {
                let report = {
                  report: this.props.reports[i],
                  submissionRate: res.data.historicalSubmissionRate
                };
                daySortedReports.push([report]);
              })
              .catch(err => console.log(err));
            arrIndex++;
          }
        }
      })
      .then(() => {
        this.setState({
          sortedReports: daySortedReports
        });
      })
      .then(() => {
        this.fetchSpecifiedData();
      })
      .catch(err => console.log(err));
  };

  fetchSpecifiedData = () => {
    if (this.props.dataType === "responseRate") {
      this.getResponseRateByDate();
    } else if (this.props.dataType === "sentimentAverage") {
      this.getSentimentAvgByDate();
    }
  };

  getResponseRateByDate = () => {
    let dataArr = [];
  };

  getSentimentAvgByDate = () => {};

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

  getSentimentAvg = () => {
    this.props.reports.forEach(report => {
      axiosWithAuth
        .get(`${URL}/responses/sentimentAvg/${report.id}`)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    });
  };

  render() {
    // this.fetchSpecifiedData();
    if (this.props.labels.length === 0 || this.state.data.length === 0) {
      return <p>Set options to display graph.</p>;
    }
    return (
      <div>
        <SentimentChart data={this.state.data} labels={this.props.labels} />
      </div>
    );
  }
}
