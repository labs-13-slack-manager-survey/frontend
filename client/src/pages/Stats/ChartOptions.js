import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";

const URL = process.env.REACT_APP_BASE_URL;

export default class ChartOptions extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    console.log(this.props);
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

  getSentimentAverage = () => {
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
