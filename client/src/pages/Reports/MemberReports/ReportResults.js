import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";
import moment from "moment";

// component imports
import MemberResponseForm from "./MemberResponseForm";
import Responders from "../../Responders/Responders";
import DatePicker from "../../DatePicker/DatePicker";
import PageTitle from "../../../components/PageTitle";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import CircleProgress from "../../../components/circleProgress.js";
import { Elevation } from "@blueprintjs/core";
import ToggleOn from "../../../images/icons/chevron-down.png";
import ToggleOff from "../../../images/icons/chevron-up.png";

import "./ReportResults.css";
import ConfirmResponse from "../../../components/ConfirmResponse";
import ResponseCard from "../../../components/ResponseCard";

const StyledSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#4A90E2",
    border: `3px solid #fff`
  },
  track: {
    backgroundColor: "#A0CBFF",
    height: 8,
    borderRadius: "10px"
  },
  trackAfter: {
    backgroundColor: "#d0d7dc"
  }
})(Slider);

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
    seeManagerQList: false,
    allReportQuestions: [],
    search: "",
    dropdown: false,
    filteredQuestionResponses: [],
    isSearchFilter: false,
    toggleDropdown: false
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

  filterQuestionSearch = (question, index) => {
    // this.setState({
    //   filteredQuestionResponses: [],
    // })
    let filteredUserQuestion = [];
    let filteredQs = [];
    console.log("i was clicked");
    console.log(question);
    this.state.responses.map(response => {
      console.log(response);
      if (response.responses.length > 0) {
        response.responses.map(answer => {
          console.log(answer);
          filteredQs.push({
            user: [answer.fullName, answer.profilePic, answer.userId]
          });
          answer.questions.forEach(q => {
            console.log(q);
            if (q.question === question) {
              filteredQs.push({ question: [q] });
            }
          });
        });
      }
    });

    // for (let i = 0; i < filteredQs.length; i+2){
    //   filteredUserQuestion.push({userRes: [filteredQs[i], filteredQs[i+1]]})
    // }

    console.log(filteredQs);
    this.setState({
      filteredQuestionResponses: filteredQs
    });
    this.filterSearch();
    this.dropDown();

    console.log(this.state.filteredQuestionResponses);
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  dropDown = () => {
    console.log("clicked");
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  filterSearch = () => {
    this.setState({
      isSearchFilter: true
    });
    console.log(this.state.filteredQuestionResponses);
  };

  cancelFilter = () => {
    console.log("clicked");
    this.setState({
      isSearchFilter: false
    });
    console.log(this.state.isSearchFilter);
  };

  render() {
    // const options = {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric"
    // };
    const {
      filteredResponse,
      seeManagerQ,
      managerFeedback,
      managerQuestionsActivated,
      seeManagerQList
    } = this.state;

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

    console.log(this.state.responses);
    if (this.state.responses) {
      let userResponses = this.state.responses;
      let dateUser = "";

      console.log(this.state.responses)


      managerPollDays.reverse().forEach(function(response) {
        let dateManager = moment(response.managerSubmitted).format(
          "DDMMMMYYYY"
        );
        let newManagerUserDay = [];
        console.log(userResponses);
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
      console.log("filteredmanagerqs");
      console.log(this.state.responses);
    }

    console.log(managerPollDays);

    console.log(this.state.managerQuestions);

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
    let managerResponsesAnswered = managerToday === today;
    if (!managerQuestionsActivated) {
      managerResponsesAnswered = false;
    }
    console.log(managerToday);
    console.log(today);
    console.log(this.state.responses);

    let memberResponse = this.state.responses.filter(
      day => day.responses.length
    );
    memberResponse = memberResponse.map(res => {
      return [
        { managerResponse: { managerSubmitted: res.date } },
        { userResponse: { ...res } }
      ];
    });
    return (
      <div className="dashboard-view">
        <main className="view">
          <PageTitle
            title="Survey"
            {...this.props}
            secondaryPage={this.state.secondaryPage}
          />

          {token.roles === "member" && managerQuestionsActivated ? (
            <ConfirmResponse
              filteredResponse={filteredResponse}
              seeManagerQ={seeManagerQ}
              toggleManagerQ={this.toggleManagerQ}
              managerPollDays={managerPollDays}
              managerResponsesAnswered={managerResponsesAnswered}
            />
          ) : !managerResponsesAnswered && !(filteredResponse.length > 0) ? (
            <div
              className="response-card"
              interactive="false"
              elevation={Elevation.TWO}
            >
              <MemberResponseForm
                {...this.props}
                updateWithUserResponse={this.updateWithManagerResponse}
                managerResponsesAnswered={managerResponsesAnswered}
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
            </>
          ) : (
            <>
              {/* managerToday ===today means the manager has responded to the questions today and vice versa */}
              {(!managerResponsesAnswered &&
                this.state.filteredResponse.length !== 0) ||
              (token.roles === "member" && managerResponsesAnswered) ? (
                <div
                  className="response-card"
                  interactive={false}
                  elevation={Elevation.TWO}
                >
                  <MemberResponseForm
                    {...this.props}
                    managerResponsesAnswered={managerResponsesAnswered}
                    updateWithUserResponse={this.updateWithManagerResponse}
                  />
                </div>
              ) : null}
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
                            src={seeManagerQList ? ToggleOn : ToggleOff}
                            alt=""
                          />
                        </div>
                      </div>
                      {seeManagerQList ? (
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

            <div className="filter-by-question">
              <div className="dropdown">
                {this.state.isSearchFilter ? (
                  <button className="cancel-filter" onClick={this.cancelFilter}>
                    Show All
                  </button>
                ) : (
                  <button class="dropbtn" onClick={this.dropDown}>
                    Filter by Question
                  </button>
                )}
                {this.state.dropdown ? (
                  <>
                    <div className="dropdown-menu">
                      {this.state.allReportQuestions.length > 0
                        ? this.state.allReportQuestions.map(
                            (question, index) => {
                              return (
                                <div className="dropdown-column">
                                  <button
                                    className="dropdown-selection"
                                    key={index}
                                    onClick={() =>
                                      this.filterQuestionSearch(question, index)
                                    }
                                  >
                                    {question}
                                  </button>
                                </div>
                              );
                            }
                          )
                        : null}
                    </div>{" "}
                  </>
                ) : null}
              </div>
            </div>
            {/* filter component */}
            {this.state.isSearchFilter ? (
              <div className="response-container">
                {this.state.filteredQuestionResponses.map(object => {
                  if (object.user) {
                    return (
                      <div className="response-container">
                        <div className="response-content">
                          <div className="response-container-main">
                            <div className="vertical-timeline" />
                            <div className="response-content">
                              <div className="user-response-header">
                                <div className="user-info">
                                  <img
                                    className="response-container-profile-pic"
                                    src={object.user[1]}
                                  />
                                  <div className="response-container-main-name-user">
                                    {object.user[0]}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="response-container">
                        <div className="response-content">
                          <div className="response-container-main">
                            <div className="vertical-timeline" />
                            <div className="response-content-filtered">
                              <div className="response-container-main-question">
                                {object.question[0].question}
                              </div>
                              {object.question[0].sentimentRange ? null : (
                                <>
                                  <div className="response-container-main-answer ">
                                    <em>A:</em> {object.question[0].answer}
                                  </div>{" "}
                                  <div className="linebr" />{" "}
                                </>
                              )}

                              {object.question[0].sentimentRange ? (
                                <>
                                  <StyledSlider
                                    className="slider"
                                    value={object.question[0].sentimentRange}
                                    min={1}
                                    max={5}
                                    step={1}
                                  />
                                  <div className="slider-label">
                                    <p
                                      className={
                                        object.question[0].sentimentRange !== 1
                                          ? "deselected"
                                          : null
                                      }
                                    >
                                      1
                                    </p>
                                    <p
                                      className={
                                        object.question[0].sentimentRange !== 2
                                          ? "deselected"
                                          : null
                                      }
                                    >
                                      2
                                    </p>
                                    <p
                                      className={
                                        object.question[0].sentimentRange !== 3
                                          ? "deselected"
                                          : null
                                      }
                                    >
                                      3
                                    </p>
                                    <p
                                      className={
                                        object.question[0].sentimentRange !== 4
                                          ? "deselected"
                                          : null
                                      }
                                    >
                                      4
                                    </p>
                                    <p
                                      className={
                                        object.question[0].sentimentRange !== 5
                                          ? "deselected"
                                          : null
                                      }
                                    >
                                      5
                                    </p>
                                  </div>
                                  <div className="linebr" />
                                  {object.question[0].answer ? (
                                    <>
                                      <div className="response-container-main-comment ">
                                        <em>Comment:</em>{" "}
                                        {object.question[0].answer}
                                      </div>{" "}
                                      <div className="linebr" />{" "}
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <>
                {console.log("yeee", Boolean(filteredManagerAndResponsesDate))}
                {filteredManagerAndResponsesDate.length
                  ? filteredManagerAndResponsesDate.map(day => (
                      <>
                        <ResponseCard
                          day={day}
                          toggleManagerQList={this.toggleManagerQList}
                          seeManagerQList={seeManagerQList}
                        />
                      </>
                    ))
                  : memberResponse
                  ? memberResponse.map(member => (
                      <>
                        <ResponseCard
                          day={member}
                          toggleManagerQList={this.toggleManagerQList}
                          seeManagerQList={seeManagerQList}
                        />
                      </>
                    ))
                  : "none"}
              </>
            )}
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
      console.log(reportRes.data.report);

      let allQuestions = [];
      reportRes.data.report.questions.forEach(question => {
        allQuestions.push(question);
      });
      let sentimentQuestionsparsed = JSON.parse(
        reportRes.data.report.sentimentQuestions
      );
      if (sentimentQuestionsparsed.length > 0) {
        sentimentQuestionsparsed.forEach(question => {
          allQuestions.push(question);
        });
      }

      console.log(allQuestions);
      const filtered = responsesRes.data[0].responses.filter(
        response => response.userId === userId
      );
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
        managerQuestionsActivated: reportRes.data.report.managerQuestions,
        isSentiment,
        responses: responsesRes.data,
        filteredResponse: filtered,
        responders,
        historicalSubmissionRate,
        managerFeedback: managerFeedback,
        allReportQuestions: allQuestions
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
