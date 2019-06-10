import React, { Component } from "react";
import SentimentAvgItem from "./SentimentAvgItem";

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
              questions={report.questions}
            />
          );
        })}
      </div>
    );
  }
}

export default SentimentAvg;
