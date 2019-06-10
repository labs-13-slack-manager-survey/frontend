import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentAvg extends Component {
  state = {
    reports: []
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>SentimentAvg</h2>
      </div>
    );
  }
}

export default SentimentAvg;
