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

  sortResponses = async () => {
    try {
      let daySortedReports = [];

      const reports = this.props.reports.map(report => {
        report.created_at = moment(report.created_at).format("l");
        return report;
      });
      const { data } = await axiosWithAuth().get(
        `${URL}/reports/submissionRate/${reports[0].id}`
      );
      let report = {
        report: reports[0],
        submissionRate: data.historicalSubmissionRate
      };
      daySortedReports.push([report]);
      let arrIndex = 0;
      for (let i = 1; i < reports.length; i++) {
        if (
          reports[i].created_at ===
          daySortedReports[arrIndex][0].report.created_at
        ) {
          const submissionRateRes = await axiosWithAuth().get(
            `${URL}/reports/submissionRate/${reports[i].id}`
          );
          let report = {
            report: reports[i],
            submissionRate: submissionRateRes.data.historicalSubmissionRate
          };
          daySortedReports[arrIndex].push(report);
        } else {
          const submissionRatesRes = await axiosWithAuth().get(
            `${URL}/reports/submissionRate/${reports[i].id}`
          );
          let report = {
            report: reports[i],
            submissionRate: submissionRatesRes.data.historicalSubmissionRate
          };
          daySortedReports.push([report]);
          arrIndex++;
        }
      }
      console.log(daySortedReports);
      console.log(daySortedReports[0][0].submissionRate);
      console.log(daySortedReports[0][1]);
      this.setState({
        sortedReports: daySortedReports
      });
      this.dataByFilter();
    } catch (err) {
      console.log(err);
    }
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
      dataArr.push(Math.random() * 100);
    }
    for (let i = 0; i < this.state.sortedReports.length; i++) {
      dataArr.splice(
        dataArr.length - i - 1,
        1,
        this.state.sortedReports[i][0].submissionRate
      );
    }
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
