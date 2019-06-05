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
        console.log(res.data.report);
        const {
          reportName,
          message,
          questions,
          isSentiment,
        } = res.data.report;
        this.setState({
          reportName,
          reportMessage: message,
          questions: questions.map(q => ({
            question: q,
            response: "",
            sentimentRange: 3,
          })),
          isSentiment: isSentiment,
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
  handleSentiment = (event, value, question) => {
    const sObj = {question, sentimentRange: value}
    console.log(sObj)
    this.setState( prevState => ({ 
      ...prevState,
      questions: prevState.questions.map( q =>
         q.question !== question ? q:sObj)
      }));
    console.log(this.state.questions)
  }

  handleChange = (e, question) => {
    console.log(question)
    // const qObj = { question, response: e.target.value };
    const sObj = {question, sentimentRange: e.target.value};
    console.log(sObj)
    // console.log(question);
    // if (this.state.isSentiment) {
    //   // this.setState(prevState => ({
    //   //   ...prevState,
    //   //   sentimentRange: question,
    //   //   questions: prevState.questions.map(q =>
    //   //     q.question !== question ? q : null
    //   //   )
    //   // }));
    //   this.setState(prevState => ({
    //     ...prevState,
    //     questions: prevState.questions.map(
    //       q => (q.question !== question? q : sObj)
    //     )
    //   }));
    // } else {
    //   this.setState(prevState => ({
    //     ...prevState,
    //     questions: prevState.questions.map(
    //       q => (q.question !== question ? q : aObj) // qObj
    //     )
    //   }));
    // }
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
              sentimentRange: this.state.sentimentRange
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
              sentimentRange: 3
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
