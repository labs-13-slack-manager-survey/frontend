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

  fetchSpecifiedData = () => {
    if (this.props.dataType === "responseRate") {
      this.getResponseRateByDate();
    } else if (this.props.dataType === "sentimentAverage") {
      this.getSentimentAvgByDate();
    }
  };

  sortResponses = () => {
    /*
      1. Clean up dates.
      2. If report dates are equal, group them together.
      3. Get data for each group.
      4. Pass in data.
      */

    let daySortedReports = [];

    // 1. Clean up data.
    this.props.reports.forEach(report => {
      report.created_at = moment(report.created_at).format("l");
    });

    daySortedReports.push([this.props.reports[0]]);

    // 2. If report dates are equal, group them together.
    let arrIndex = 0;
    for (let i = 1; i < this.props.reports.length; i++) {
      let arrArrIndex = 0;
      if (
        this.props.reports[i].created_at ===
        daySortedReports[arrIndex][arrArrIndex].created_at
      ) {
        daySortedReports[arrIndex].push(this.props.reports[i]);
      } else {
        daySortedReports.push([this.props.reports[i]]);
        arrIndex++;
      }
    }

    this.setState({
      sortedReports: daySortedReports
    });
  };

  getResponseRateByDate = () => {
    let dataArr = [];
    this.state.sortedReports.forEach(arr => {
      console.log(arr);
      arr.forEach(report => {
        console.log(report);
        axiosWithAuth()
          .get(`${URL}/reports/submissionRate/${report.id}`)
          .then(res => {
            console.log(res.data.historicalSubmissionRate);
            dataArr.push(res.data.historicalSubmissionRate);
            console.log(dataArr);
          })
          .catch(err => console.log(err));
      });
    });
    console.log(this.state.data);
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
    this.fetchSpecifiedData();
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
