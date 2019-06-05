import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentAvg extends Component {
  state = {
    reports: []
  };

  componentDidMount() {
    axiosWithAuth()
      .get(`${URL}/reports`)
      .then(res => {
        console.log(res);
        this.setState({
          reports: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>SentimentAvg</h2>
      </div>
    );
  }
}

export default SentimentAvg;
