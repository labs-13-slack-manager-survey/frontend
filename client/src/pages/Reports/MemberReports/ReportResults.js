import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";
import moment from "moment";

// component imports
import MemberResponseForm from "./MemberResponseForm";
import Responders from "../../Responders/Responders";
import DatePicker from "../../DatePicker/DatePicker";
import PageTitle from "../../../components/PageTitle";

import CircleProgress from "../../../components/circleProgress.js";
import { Elevation } from "@blueprintjs/core";
import ToggleOn from "../../../images/icons/chevron-down.png";
import ToggleOff from "../../../images/icons/chevron-up.png";
import ResponseCard from "../../../components/ResponseCard";

import "./ReportResults.css";
import ConfirmResponse from "../../../components/ConfirmResponse";
import ManagerFeedbackForManagers from "../../../components/ManagerFeedbackForManagers";

class ReportResults extends Component {
  state = {
    responses: [],
    clickedDate: null,
    filteredResponse: [],
    clickedResponder: null,
    responders: [],
    completed: false,
    managerCompleted: false,
    isComplete: false,
    isSentiment: false,
    secondaryPage: true,
    managerQuestionsActivated: true,
    percentComplete: 0,
    historicalSubmissionRate: 0,
    managerQuestions: [],
    managerResponses: [],
    managerSubmitted: [],
    managerFeedback: [],
    seeManagerQ: true,
    seeManagerQList: false
  };

  toggleManagerQ = () => {
    this.setState({
      seeManagerQ: !this.state.seeManagerQ
    });
  };

  toggleManagerQList = () => {
    this.setState({
      seeManagerQList: !this.state.seeManagerQList
    });
  };

  getDate = date => {
    let formatted = moment(date).format("DD MMMM YYYY");
    return formatted;
  };

  render() {
    // const options = {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric"
    // };
    const { filteredResponse, seeManagerQ, managerFeedback } = this.state;

    let managerPollDays = [];

    for (let i = 0; i < this.state.managerFeedback.length; i++) {
      let managerQandA = {};
      managerQandA.managerQuestions = JSON.parse(
        this.state.managerFeedback[i].managerQuestions
      );
      managerQandA.managerResponses = JSON.parse(
        this.state.managerFeedback[i].managerResponses
      );
      managerQandA.managerSubmitted = this.state.managerFeedback[
        i
      ].submitted_date;
      managerPollDays.push(managerQandA);
    }

    let filteredManagerAndResponsesDate = [];
    let allDates = [];

    if (this.state.responses) {
      let userResponses = this.state.responses;
      let dateUser = "";

      managerPollDays.reverse().forEach(function(response) {
        let dateManager = moment(response.managerSubmitted).format(
          "DDMMMMYYYY"
        );
        let newManagerUserDay = [];
        newManagerUserDay.push({ managerResponse: response });

        for (let i = 0; i < userResponses.length; i++) {
          dateUser = moment(userResponses[i].date).format("DDMMMMYYYY");
          allDates.push(dateUser);
          if (dateUser === dateManager) {
            newManagerUserDay.push({ userResponse: userResponses[i] });
          }
        }

        filteredManagerAndResponsesDate.push(newManagerUserDay);
      });
    }

    //calculating date of the manager report
    const token = jwt_decode(localStorage.getItem("token"));

    let today = new Date();
    today = moment(today).format("DD MMMM YYYY");

    // let today2 = new Date();
    // today2 = moment(today).format('DD MMMM YYYY');

    let managerToday =
      managerPollDays.length &&
      managerPollDays[managerPollDays.length - 1].managerSubmitted;

    managerToday = moment(managerToday).format("DD MMMM YYYY");

    let memberResponse = this.state.responses.filter(
      day => day.responses.length
    );
    memberResponse = memberResponse.map(res => {
      return [
        { managerResponse: { managerSubmitted: res.date } },
        { userResponse: { ...res } }
      ];
    });
    const managerResponsesAnswered = managerToday === today;
    return (
      <div className="dashboard-view">
        <main className="view">
          <PageTitle
            title="Survey"
            {...this.props}
            secondaryPage={this.state.secondaryPage}
          />

          {token.roles === "member" && this.state.managerQuestionsActivated ? (
            <ConfirmResponse
              filteredResponse={filteredResponse}
              seeManagerQ={seeManagerQ}
              toggleManagerQ={this.toggleManagerQ}
              managerPollDays={managerPollDays}
              managerResponsesAnswered={managerResponsesAnswered}
            />
          ) : !managerResponsesAnswered ? (
            <div
              className="response-card"
              interactive="false"
              elevation={Elevation.TWO}
            >
              <MemberResponseForm
                {...this.props}
                updateWithUserResponse={this.updateWithManagerResponse}
              />
            </div>
          ) : null}

          {this.state.filteredResponse.length > 0 ||
          this.state.managerCompleted === true ? (
            <>
              <div className="confirm-response">
                {!managerResponsesAnswered ? (
                  "Your response has been recorded "
                ) : (
                  <managerFeedbackForManagers
                    managerFeedback={managerFeedback}
                    managerPollDays={managerPollDays}
                  />
                )}
              </div>
              <div className="linebr" />
            </>
          ) : (
            <>
              {/* managerToday ===today means the manager has responded to the questions today and vice versa */}
              {(!managerResponsesAnswered &&
                this.state.filteredResponse.length !== 0) ||
              (token.roles === "member" && managerResponsesAnswered) ||
              !this.state.managerQuestions.length ? (
                <div
                  className="response-card"
                  interactive="false"
                  elevation={Elevation.TWO}
                >
                  <MemberResponseForm
                    {...this.props}
                    updateWithUserResponse={this.updateWithManagerResponse}
                  />
                </div>
              ) : null}
              <div className="linebr" />
            </>
          )}

          <section className="report-results-feed">
            {managerPollDays.map(res => {
              if (
                this.getDate(
                  this.state.managerFeedback[
                    this.state.managerFeedback.length - 1
                  ].submitted_date
                ) === today
              ) {
                return null;
              } else {
                return (
                  <>
                    <div
                      className="response-container-manager"
                      onClick={this.toggleManagerQList}
                    >
                      <div className="user-info">
                        <div className="month-day">
                          <div className="calendar-top">
                            {moment(
                              this.state.managerFeedback[
                                this.state.managerFeedback.length - 1
                              ].submitted_date
                            ).format("DD")}
                          </div>
                          <div className="calendar-bot">
                            {moment(
                              this.state.managerFeedback[
                                this.state.managerFeedback.length - 1
                              ].submitted_date
                            ).format("MMMM")}
                          </div>
                        </div>
                        <div className="manager-response-header-text">
                          <div className="response-container-main-name-manager">
                            Manager Comments
                          </div>
                          <img
                            className="manager-toggle-list"
                            src={
                              this.state.seeManagerQList ? ToggleOn : ToggleOff
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      {this.state.seeManagerQList ? (
                        <>
                          <div className="linebr" />
                          <div className="response-container-main">
                            <div className="response-content">
                              <div className="manager-question">
                                {res.managerQuestions[0]}
                              </div>
                              <div className="manager-response ">
                                {res.managerResponses[0]}
                              </div>
                              <div className="linebr" />

                              <div className="manager-question">
                                {res.managerQuestions[1]}
                              </div>
                              <div className="manager-response ">
                                {res.managerResponses[1]}
                              </div>
                              <div className="linebr" />

                              <div className="manager-question">
                                {res.managerQuestions[2]}
                              </div>
                              <div className="manager-response ">
                                {res.managerResponses[2]}
                              </div>
                              {res.managerQuestions.length === 4 ? (
                                <>
                                  <div className="linebr" />
                                  <div className="manager-question">
                                    {res.managerQuestions[3]}
                                  </div>
                                  <div className="manager-response ">
                                    {res.managerResponses[3]}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>
                );
              }
            })}
            {console.log("mres111", memberResponse)}
            {filteredManagerAndResponsesDate.length && token.roles === "member"
              ? filteredManagerAndResponsesDate.map(day => {
                  console.log("manager res", day);
                  return (
                    <ResponseCard
                      day={day}
                      toggleManagerQ={this.toggleManagerQ}
                      toggleManagerQList={this.toggleManagerQList}
                      seeManagerQList={this.state.seeManagerQList}
                    />
                  );
                })
              : memberResponse.map(res => {
                  console.log("day", res);
                  return (
                    <ResponseCard
                      day={res}
                      toggleManagerQ={this.toggleManagerQ}
                      toggleManagerQList={this.toggleManagerQList}
                      seeManagerQList={this.state.seeManagerQList}
                    />
                  );
                })}
          </section>
        </main>

        {/* The components below are the circle chart and calendar */}
        <div className="sidebar">
          <CircleProgress
            title="Today's Survey"
            // minorFix
            percentComplete={this.state.historicalSubmissionRate}
          />
          <div className="calendar">
            <h1 className="title">Filter by day</h1>
            <DatePicker
              clickedDate={this.state.clickedDate}
              clickedResponder={this.state.clickedResponder}
              filter={this.filter}
            />
          </div>

          <div className="responders-component">
            <h1 className="title">Filter by team member</h1>
            {this.state.responders.length === 0 ? (
              <div className="error-message"> no responses yet </div>
            ) : (
              <Responders
                responders={this.state.responders}
                filter={this.filter}
                clickedDate={this.state.clickedDate}
                clickedResponder={this.state.clickedResponder}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  getData = async () => {
    try {
      const userId = jwt_decode(localStorage.getItem("token")).subject;
      // makes 3 api calls to get reports/responses and submission rate
      const [
        reportRes,
        responsesRes,
        submissionRes,
        managerRes
      ] = await Promise.all([
        await axiosWithAuth().get(
          `${baseURL}/reports/${this.props.match.params.reportId}`
        ),

        await axiosWithAuth().get(
          `${baseURL}/responses/${this.props.match.params.reportId}`
        ),

        await axiosWithAuth().get(
          `${baseURL}/reports/submissionRate/${
            this.props.match.params.reportId
          }`
        ),

        await axiosWithAuth().get(
          `${baseURL}/responses/managerQuestions/${
            this.props.match.params.reportId
          }`
        )
      ]);
      console.log(reportRes.data);
      console.log(responsesRes.data);
      console.log(managerRes.data);
      const { isSentiment } = reportRes.data.report;
      // format the submissionRate
      let { historicalSubmissionRate } = submissionRes.data;
      historicalSubmissionRate /= 100;

      const managerFeedback = [];
      managerRes.data.forEach(feedback => {
        managerFeedback.push({
          managerQuestions: feedback.managerQuestions,
          managerResponses: feedback.managerResponses,
          submitted_date: feedback.submitted_date
        });
      });
      const filtered = responsesRes.data[0].responses.filter(
        response => response.userId === userId
      );
      console.log(filtered);
      // Filter all unique responders and push to state
      const user = [];
      const responders = [];
      responsesRes.data.forEach(({ responses }) => {
        responses.length > 0 &&
          responses.forEach(({ userId, profilePic, fullName }) => {
            if (!user.includes(userId)) {
              user.push(userId);
              responders.push({ userId, profilePic, fullName });
            }
          });
      });
      this.setState({
        managerQuestionsActivated: Boolean(
          reportRes.data.report.managerQuestions
        ),
        isSentiment,
        responses: responsesRes.data,
        filteredResponse: filtered,
        responders,
        historicalSubmissionRate,
        managerFeedback: managerFeedback
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getData();
  }

  filter = (date, responder) => {
    axiosWithAuth()
      .post(`${baseURL}/responses/${this.props.match.params.reportId}/filter`, {
        date: date,
        user: responder
      })
      .then(res => {
        const { clickedDate, clickedResponder, responses } = res.data;
        this.setState({ clickedDate, clickedResponder, responses });
      })
      .catch(err => {
        console.log(err);
      });
  };
  updateWithUserResponse = res => {
    this.setState({ responses: res.data, completed: true, isComplete: true });
  };

  updateWithUserResponse = res => {
    this.setState({
      responses: res.data,
      managerCompleted: true,
      isComplete: true
    });
  };
}

export default ReportResults;
