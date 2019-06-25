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
      default:
        console.log("default");
    }
  };

  getResponseRateByDate = num => {
    let dataArr = [];
    let avgs = [];

    for (let i = 0; i < num; i++) {
      dataArr.push(Math.random() * 100);
    }

    this.state.sortedReports.forEach(arr => {
      let dayAvg = 0;
      arr.forEach(report => {
        dayAvg += report.submissionRate;
      });
      dayAvg = dayAvg / this.state.sortedReports.length;
      avgs.push(dayAvg);
    });

    for (let i = 0; i < this.state.sortedReports.length; i++) {
      dataArr.splice(dataArr.length - i - 1, 1, avgs[i]);
    }

    this.setState({
      data: dataArr
    });
  };

  getSentimentAvgByDate = () => {
    let avgs = [];
    this.props.reports.forEach(report => {
      axiosWithAuth()
        .get(`${URL}/responses/sentimentAvg/${report.id}`)
        .then(res => {
          avgs.push(res.data[0].average);
        })
        .catch(err => console.log(err));
    });

    this.setState({
      data: avgs
    });
  };

  render() {
    if (this.props.labels.length === 0 || this.state.data.length === 0) {
      return <p>Set options to display graph.</p>;
    }
    return (
      <div>
        <SentimentChart
          data={this.state.data}
          labels={this.props.labels}
          max={this.props.dataType === "responseRate" ? 100 : 5}
          label={
            this.props.dataType === "responseRate"
              ? "Response Rate"
              : "Sentiment Average"
          }
        />
      </div>
    );
  }
}
