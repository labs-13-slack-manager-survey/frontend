import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

import SentimentChart from "./SentimentChart";

const URL = process.env.REACT_APP_BASE_URL;

export default class ChartOptions extends Component {
  state = {
    data: []
  };

  componentDidMount() {
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
    console.log(this.state.data);
    if (this.props.labels.length === 0 || this.state.data.length === 0) {
      return <p>Set Options for Graph</p>;
    }
    return (
      <div>
        <SentimentChart data={this.state.data} labels={this.props.labels} />
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
