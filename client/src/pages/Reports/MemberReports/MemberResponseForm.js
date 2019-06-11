import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

import CreateReport from "../ModifyReports/CreateReport";
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
    typeOfManager: [],
    managerQuestions: [],
    managerResponses: []
  };

  render() {
    console.log("membersResponse", this.state);
    return this.state.clientInfo.length > 0 ? (
      <>
        <div>{this.state.clientInfo}</div>
      </>
    ) : (
      <div>
        {/*need to render this condtionally  */}
        {this.state.isSentiment ? null : (
          <div>
            <h1 className="member-form-title">Managers Thoughts</h1>
            <h3>{this.state.managerQuestions[0]}</h3>
            <h3>{this.state.managerResponses[0]}</h3>
            <h3>{this.state.managerQuestions[1]}</h3>
            <h3>{this.state.managerResponses[1]}</h3>
            <h3>{this.state.managerQuestions[2]}</h3>
            <h3>{this.state.managerResponses[2]}</h3>
          </div>
        )}

        <h1 className="member-form-title">{this.state.reportName}</h1>
        <p className="member-form-subtitle">{this.state.reportMessage}</p>
        {this.state.questions.map((q, i) => (
          <ReportInput
            question={q.question}
            response={q.response}
            sentimentRange={q.sentimentRange}
            handleChange={this.handleChange}
            key={i}
            isSentiment={this.state.isSentiment}
            handleSentiment={this.handleSentiment}
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
        const {
          reportName,
          message,
          questions,
          isSentiment,
          managerResponses,
          // typeOfManager, //new manager templates need to be added here so they can be sent to MemberReposonseForm.js
          managerQuestions
        } = res.data.report;
        this.setState({
          reportName,
          reportMessage: message,
          questions: questions.map(q => ({
            question: q,
            response: "",
            sentimentRange: 3
          })),
          managerQuestions,
          managerResponses: JSON.parse(managerResponses),
          isSentiment: isSentiment
          // sentimentRange: sentimentRange
        });
      })
      .catch(err => console.log(err));
  }
  //   this.setState(prevState => ({
  //     ...prevState,
  //     questions: prevState.questions.map(
  //       q => (q.question !== question ? q : aObj) // qObj
  //     )
  //   }));

  //handling the submit for sentiment functions
  handleSentiment = (event, value, question) => {
    this.setState(prevState => ({
      ...prevState,
      questions: prevState.questions.map(q => {
        return q.question !== question
          ? q
          : { question, sentimentRange: value, response: q.response };
      })
    }));
  };

  handleChange = (e, question) => {
    const qObj = {
      question,
      response: e.target.value
    };

    this.setState(prevState => ({
      ...prevState,
      questions: prevState.questions.map(
        q =>
          q.question !== question
            ? q
            : {
                question,
                sentimentRange: q.sentimentRange,
                response: qObj.response
              } // qObj
      )
    }));
  };

  submitReport = () => {
    const endpoint = `${baseURL}/responses/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .post(endpoint, this.state.questions)
      .then(res => {
        if (this.state.isSentiment) {
          this.props.updateWithUserResponse(res);

          this.setState(prevState => ({
            ...prevState,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: "",
              sentimentRange: 3
            }))
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: ""
            }))
          }));
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
}

export default MemberResponseForm;
