import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

import CreateReport from "../ModifyReports/CreateReport";
import ReportInput from "./ReportInput";
import ChevronUp from '../../../images/icons/chevron-up.png'
import ChevronDown from '../../../images/icons/chevron-down.png'

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
    managerResponses: [],
    toggleManager: true,
  };

  toggleManagerQ = () => {
    this.setState({ 
      toggleManager: !this.state.toggleManager,
    })
    console.log(this.state.toggleManager)
  }

  render() {
    return this.state.clientInfo.length > 0 ? (
      <>
        <div>{this.state.clientInfo}</div>
      </>
    ) : (
      <div>
        {/*need to render this condtionally  */}
        {this.state.isSentiment || this.state.managerResponses[0] !== "" ? null : (
          <div className = "manager-poll-responses">
            <div className = "poll-header-toggle"  onClick={this.toggleManagerQ}>
              <div className="member-form-title">Managers Thoughts</div>
              <img className = "thoughts-toggle" src={this.state.toggleManager ? ChevronDown : ChevronUp} />
            </div>
            {this.state.toggleManager ? null : <p className="member-form-subtitle">click to view your manager's goals for the week</p> }
            <div className = "vertical-line" />
            {this.state.toggleManager ? 
            <> 
            <div className = "manager-poll-question">{this.state.managerQuestions[0]}</div>
            <div className = "manager-poll-response">{this.state.managerResponses[0]}</div>
            <div className = "manager-poll-question">{this.state.managerQuestions[1]}</div>
            <div className = "manager-poll-response">{this.state.managerResponses[1]}</div>
            <div className = "manager-poll-question">{this.state.managerQuestions[2]}</div>
            <div className = "manager-poll-response">{this.state.managerResponses[2]}</div>
            <div className = "manager-poll-question">{this.state.managerQuestions[3]}</div>
            <div className = "manager-poll-response">{this.state.managerResponses[3]}</div>
            <div className = "vertical-line" />
            </> : null }
          
          </div>
        )}
        <div className = "poll-header">
          <div className="member-form-title">{this.state.reportName}</div>
          <p className="member-form-subtitle">{this.state.reportMessage}</p>
        </div>

        <ol type="1">{this.state.questions.map((q, i) => (
          <li><ReportInput
            question={q.question}
            response={q.response}
            sentimentRange={q.sentimentRange}
            handleChange={this.handleChange}
            key={i}
            isSentiment={this.state.isSentiment}
            handleSentiment={this.handleSentiment}
          /></li>
        ))}</ol>
        
        <Button
          style={{
            display: "block",
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px"
          }}
          variant="outlined"
          color="primary"
          onClick={this.submitAll}
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
            })),
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

  reload = () => {
    window.location.reload()
  }

  submitAll = () =>{
    this.submitReport();
    this.reload()
  }

}

export default MemberResponseForm;
