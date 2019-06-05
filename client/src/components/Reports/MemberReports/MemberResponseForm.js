import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

import ReportInput from "./ReportInput";

// style imports
import Button from "@material-ui/core/Button";
import "./MemberResponseForm.css";

class MemberResponseForm extends Component {
  state = {
    clientInfo: "",
    reportName: "",
    reportMessage: "",
    questions: [],
    isSentiment: false,
    sentimentVal: 0
  };

  render() {
    return this.state.clientInfo.length > 0 ? (
      <>
        <div>{this.state.clientInfo}</div>
      </>
    ) : (
      <div>
        <h1 className="member-form-title">{this.state.reportName}</h1>
        <p className="member-form-subtitle">{this.state.reportMessage}</p>
        {this.state.questions.map((q, i) => (
          <ReportInput
            question={q.question}
            response={q.response}
            handleChange={this.handleChange}
            key={i}
            isSentiment={this.state.isSentiment}
            sentimentVal={this.state.sentimentVal}
          />
        ))}
        <Button
          style={{
            display: "block",
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px"
          }}
          variant="outlined"
          color="primary"
          onClick={this.submitReport}
        >
          Submit Report
        </Button>
      </div>
    );
  }

  componentDidMount() {
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        console.log(res.data.report);
        const {
          reportName,
          message,
          questions,
          isSentiment,
          sentimentRange
        } = res.data.report;
        this.setState({
          reportName,
          reportMessage: message,
          questions: questions.map(q => ({
            question: q,
            response: ""
          })),
          isSentiment: isSentiment,
          sentimentVal: sentimentRange
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, question) => {
    // const qObj = { question, response: e.target.value };
    // const sObj = {question, sentimentVal: e.target.value};
    console.log(question);
    if (this.state.isSentiment) {
      this.setState(prevState => ({
        ...prevState,
        sentimentVal: question,
        questions: prevState.questions.map(q =>
          q.question !== question ? q : null
        )
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        questions: prevState.questions.map(
          q => (q.question !== question ? q : null) // qObj
        )
      }));
    }
  };

  submitReport = () => {
    const endpoint = `${baseURL}/responses/${this.props.match.params.reportId}`;
    if (this.state.isSentiment) {
      axiosWithAuth()
        .post(
          endpoint,
          this.state.questions.map(val => {
            return {
              question: val.question,
              response: "test",
              sentimentVal: this.state.sentimentVal
            };
          })
        )
        .then(res => {
          this.props.updateWithUserResponse(res);
          this.setState(prevState => ({
            ...prevState,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: "",
              sentimentVal: 3
            }))
          }));
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      console.log(this.state.questions);
      axiosWithAuth()
        .post(endpoint, this.state.questions)
        .then(res => {
          this.props.updateWithUserResponse(res);
          this.setState(prevState => ({
            ...prevState,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: ""
            }))
          }));
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  };
}

export default MemberResponseForm;
