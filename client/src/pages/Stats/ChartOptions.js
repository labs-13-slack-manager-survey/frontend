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
        console.log(daySortedReports);
        console.log(daySortedReports[0][0].submissionRate);
        console.log(daySortedReports[0][1]);
        this.setState({
          sortedReports: daySortedReports
        });
      })
      .then(() => {
        this.dataByFilter();
      })
      .catch(err => console.log(err));
  };

  dataByFilter = () => {
    switch (this.props.filterBy) {
      case "day":
        if (this.props.dataType === "responseRate") {
          this.getResponseRateByDate(1);
        } else if (this.props.dataType === "sentimentAverage") {
          this.getSentimentAvgByDate(1);
        }
        break;
      case "week":
        if (this.props.dataType === "responseRate") {
          this.getResponseRateByDate(7);
        } else if (this.props.dataType === "sentimentAverage") {
          this.getSentimentAvgByDate(7);
        }
        break;
      case "month":
        if (this.props.dataType === "responseRate") {
          this.getResponseRateByDate(30);
        } else if (this.props.dataType === "sentimentAverage") {
          this.getSentimentAvgByDate(30);
        }
        break;
      case "quarter":
        if (this.props.dataType === "responseRate") {
          this.getResponseRateByDate(90);
        } else if (this.props.dataType === "sentimentAverage") {
          this.getSentimentAvgByDate(90);
        }
        break;
      case "year":
        if (this.props.dataType === "responseRate") {
          this.getResponseRateByDate(365);
        } else if (this.props.dataType === "sentimentAverage") {
          this.getSentimentAvgByDate(365);
        }
        break;
    }
  };

  getResponseRateByDate = num => {
    let dataArr = [];
    for (let i = 0; i < num; i++) {
      dataArr.push(50);
    }
    // this.state.sortedReports.forEach(arr => {
    //   dataArr.push(arr[0].submissionRate);
    // });
    this.setState({
      data: dataArr
    });
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
