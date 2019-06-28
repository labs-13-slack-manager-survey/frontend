import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

import { getDay, getHours, getMinutes } from "date-fns";
// import { getHours } from "date-fns";
// import { getMinutes } from "date-fns";
// import CreateReport from "../ModifyReports/CreateReport";
import ReportInput from "./ReportInput";
// import ChevronUp from "../../../images/icons/chevron-up.png";
// import ChevronDown from "../../../images/icons/chevron-down.png";

// style imports
import Button from "@material-ui/core/Button";
import "./MemberResponseForm.css";
import ManagerPoll from "../../../components/ManagerPoll";

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
    sentimentQuestions: [],
    scheduledTimeMet: false
  };

  toggleManagerQ = () => {
    this.setState({
      toggleManager: !this.state.toggleManager
    });
  };
  completeSurvey = () => {
    this.setState({ isComplete: true });
  };
  render() {
    const token = jwt_decode(localStorage.getItem("token"));

    return this.state.clientInfo.length > 0 ? (
      <>
        <div>{this.state.clientInfo}</div>
      </>
    ) : (
      <>
        <div>
          {/*conditional render based on user role and if the manager survey is set*/}
          {token.roles === "admin" ? (
            this.state.managerQuestions &&
            this.state.managerQuestions.length > 0 ? (
              <>
                <ManagerPoll reportId={this.props.match.params.reportId} />
              </>
            ) : (
              <div className="member-form-subtitle">manager survey not set</div>
            )
          ) : this.state.scheduledTimeMet ? (
            <section>
              <div className="poll-header">
                <div className="member-form-title">{this.state.reportName}</div>
                <p className="member-form-subtitle">
                  {this.state.reportMessage}
                </p>
              </div>

              <ol type="1">
                {this.state.questions &&
                  this.state.questions.map((q, i) => (
                    <li>
                      <ReportInput                        question={q.question}
                        response={q.response}
                        sentimentRange={q.sentimentRange}
                        handleChange={this.handleChange}
                        key={i}
                        isSentiment={this.state.isSentiment}
                        handleSentiment={this.handleSentiment}
                      />
                    </li>
                  ))}

                {this.state.sentimentQuestions &&
                  this.state.sentimentQuestions.map((sq, i) => (
                    <li>
                      <ReportInput
                        question={sq.question}
                        response={sq.response}
                        sentimentRange={sq.sentimentRange}
                        handleSentimentComment={this.handleSentimentComment}
                        key={i}
                        isSentiment={true}
                        handleSentiment={this.handleSentiment}
                      />
                    </li>
                  ))}
              </ol>

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
                Submit Survey
              </Button>
            </section>
          ) : (
            <>
              <h5>
                Apologies! Report is scheduled but not yet sent.Please wait
                until the scheduled time is met!
              </h5>
            </>
          )}
        </div>
      </>
    );
  }

  componentDidMount() {
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    const { roles } = jwt_decode(localStorage.getItem("token"));
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        console.log("res", res);
        const {
          id,
          reportName,
          message,
          questions,
          sentimentQuestions,
          isSentiment,
          managerResponses,
          managerQuestions,
          schedule,
          scheduleTime
        } = res.data.report;
        const { pollsReceived } = res.data;
        // required for date-fns
        const daysToNumbers = {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday"
        };
        // calculate the time to make sure the reports aren't submitted if it is not scheduled
        const currentDate = new Date();
        const dayOfWeek = daysToNumbers[getDay(currentDate)];
        const currentHrAndMin = `${getHours(currentDate)}${getMinutes(
          currentDate
        )}`;
        let scheduledHrAndMin = scheduleTime.split(":");
        scheduledHrAndMin.pop();
        scheduledHrAndMin = scheduledHrAndMin.join("");
        const withinTimeFrame =
          Number(currentHrAndMin) - Number(scheduledHrAndMin) > 0;
        // check if user has received the poll from the token
        const receivedAtLeastOnce = pollsReceived && pollsReceived.includes(id);

        if (roles === "member") {
          if (
            receivedAtLeastOnce &&
            schedule.includes(dayOfWeek)
            // && withinTimeFrame
          ) {
            this.setState({
              reportName,
              reportMessage: message,
              questions: questions.map(q => ({
                question: q,
                response: "",
                sentimentRange: 3
              })),
              scheduledTimeMet: true,
              managerQuestions,
              managerResponses: JSON.parse(managerResponses),
              isSentiment: isSentiment,
              sentimentQuestions: JSON.parse(sentimentQuestions).map(q => ({
                question: q,
                response: "",
                sentimentRange: 3
              }))
            });
          } else {
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
              isSentiment: isSentiment,
              sentimentQuestions: JSON.parse(sentimentQuestions).map(q => ({
                question: q,
                response: "",
                sentimentRange: 3
              })),
              scheduledTimeMet: false,
              schedule: {
                ...this.state.schedule,
                day: schedule,
                time: scheduleTime
              }
            });
          }
        } else {
          this.setState({
            reportName,
            reportMessage: message,
            questions: questions.map(q => ({
              question: q,
              response: "",
              sentimentRange: 3
            })),
            scheduledTimeMet: true,
            managerQuestions,
            managerResponses: JSON.parse(managerResponses),
            isSentiment: isSentiment,
            sentimentQuestions: JSON.parse(sentimentQuestions).map(q => ({
              question: q,
              response: "",
              sentimentRange: 3
            }))
          });
        }
      })
      .catch(err => console.log(err));
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

  handleSentimentComment = (e, question) => {
    console.log("senq", e.target.value);
    const sqObj = {
      question,
      response: e.target.value
    };
    console.log("obj", sqObj);
    this.setState(prevState => ({
      ...prevState,
      sentimentQuestions: prevState.sentimentQuestions.map(
        sq =>
          sq.question !== question
            ? sq
            : {
                question,
                sentimentRange: sq.sentimentRange,
                response: sqObj.response
              } // qObj
      )
    }));
  };

  submitReport = () => {
    const allQuestions = {
      questions: this.state.questions,
      sentimentQuestions: this.state.sentimentQuestions
    };
    // format the body to be as follows
    // {
    //   questions:[{q,r,sval}]
    //   sentimentQuestions:[{q,r,sval}]
    // }
    const endpoint = `${baseURL}/responses/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .post(endpoint, allQuestions)
      .then(res => {
        if (this.state.isSentiment) {
          this.props.updateWithUserResponse(res);
          this.setState(prevState => ({
            ...prevState,
            isComplete: true,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: "",
              sentimentRange: 3
            }))
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            isComplete: true,
            questions: prevState.questions.map(q => ({
              question: q.question,
              response: ""
            }))
          }));
        }
        window.location.reload();
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  submitAll = () => {
    this.completeSurvey();
    this.submitReport();
  };
}

export default MemberResponseForm;
