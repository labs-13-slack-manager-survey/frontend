import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";
import SentimentAvgItem from "./SentimentAvgItem";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentAvg extends Component {
  state = {
    reports: []
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.reports.map(report => {
          return (
            <SentimentAvgItem
              key={report.id}
              id={report.id}
              name={report.reportName}
              message={report.message}
            />
          );
        })}
      </div>
    );
  }
}

export default SentimentAvg;
