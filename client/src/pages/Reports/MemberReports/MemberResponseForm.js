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
    isComplete: false,
    test:""
  };

  toggleManagerQ = () => {
    this.setState({ 
      toggleManager: !this.state.toggleManager,
    })
    console.log(this.state.toggleManager)
  }
  completeSurvey = () =>{
  this.setState({isComplete: !this.state.isComplete})
}
  render() {
    console.log(this.state)
    return this.state.clientInfo.length > 0 ? (
      <>
        <div>{this.state.clientInfo}</div>
      </>
    ) : (
      <div>
        {/*need to render this condtionally  */}
        {this.state.isSentiment ? null : (
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
        ))}
        
        
        {this.state.sentimentQuestions.map((sq, i) => (
          <li><ReportInput
            question={sq.question}
            response={sq.response}
            sentimentRange={sq.sentimentRange}
            handleChange={this.handleChange}
            key={i}
            isSentiment= {true} 
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
          sentimentQuestions,
          isSentiment,
          managerResponses,
          managerQuestions,
      
        } = res.data.report;
        console.log(reportName);
        console.log(sentimentQuestions);
        console.log(managerQuestions);
        this.setState({
          reportName,
          reportMessage: message,
          questions: questions.map(q => ({
            question: q,
            response: "",
            sentimentRange: 3,
          })),
          managerQuestions,
          managerResponses: JSON.parse(managerResponses),
          isSentiment: isSentiment,
        });
      })
      .catch(err => console.log(err));
      console.log(this.state)
  }

  handleSentiment = (event, value, question) => {
    this.setState(prevState => ({
      ...prevState,
      sentimentQuestions: prevState.sentimentQuestions.map(sq => {
        return sq.question !== question
          ? sq
          : { question, sentimentRange: value, response: sq.response };
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
              sentimentRange: 3,
            })),
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: "",
            })),
            isComplete:!this.state.isComplete
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
    this.completeSurvey()
    this.submitReport();
    this.reload()
  }

}

export default MemberResponseForm;
