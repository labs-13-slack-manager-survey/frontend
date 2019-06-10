import React, { Component } from "react";
import { axiosWithAuth } from "../../config/axiosWithAuth";

const URL = process.env.REACT_APP_BASE_URL;

class SentimentAvgItem extends Component {
  state = {
    average: "No Data"
  };

  componentDidMount() {
    this.getSentimentAvg(this.props.id);
    console.log(this.props);
  }

  getSentimentAvg = id => {
    axiosWithAuth()
      .get(`${URL}/responses/sentimentAvg/${id}`)
      .then(res => {
        this.setState({
          average: res.data[0].average
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div
        style={{
          margin: "10px",
          padding: "10px",
          border: "1px solid black"
        }}
      >
        <h4>Title: {this.props.name}</h4>
        <p>Message: {this.props.message}</p>
        <p>Questions: {this.props.questions}</p>
        {this.state.average === null ? (
          <p>Sentiment Average: No Responses Yet</p>
        ) : (
          <p>Sentiment Average: {this.state.average}</p>
        )}
      </div>
    );
  }
}

export default SentimentAvgItem;
