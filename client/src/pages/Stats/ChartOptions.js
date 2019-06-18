import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";

const URL = process.env.REACT_APP_BASE_URL;

export default class ChartOptions extends Component {
  state = {
    data: [],
    labels: [],
    filterBy: ""
  };

  componentDidMount() {
    console.log("hello");
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

  render() {
    return (
      <div>
        {this.props.labels > 0 ? (
          <SentimentChart data={this.props.data} labels={this.props.labels} />
        ) : (
          <p>Set Options for Graph</p>
        )}
      </div>
    );
  }
}

/* 
--- ISSUES ---
1. Labels getting set a click late.
2. SentimentChart not rendering after label state gets set. 
3. Data not getting passed to SentimentChart.
*/
