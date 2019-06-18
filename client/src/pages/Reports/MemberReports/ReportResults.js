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
import { Card, Elevation } from "@blueprintjs/core";

import "./ReportResults.css";

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
    isSentiment: false,
    secondaryPage: true,
    percentComplete: 0,
    historicalSubmissionRate: 0,
<<<<<<< HEAD
    managerQuestions: [],
    managerResponses: [], 
=======
    isComplete:false
>>>>>>> 74f0c9bc6a0e15ea119650b825850f21e6acfb1d
  };

  render() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    console.log("REPORT RESULT STATE",this.state)
    return (
      <div className="dashboard-view">
        <main className="view">
          <PageTitle
            title="Report"
            {...this.props}
            secondaryPage={this.state.secondaryPage}
          />

          {this.state.filteredResponse.length > 0 ||
          this.state.completed === true ? (
            <>
              <div className="confirm-response">
                Your response has been recorded
              </div>
              <div className="linebr" />
            </>
          ) : (
            <>
              <div
                className="response-card"
                interactive={false}
                elevation={Elevation.TWO}
              >
                <MemberResponseForm
                  {...this.props}
                  updateWithUserResponse={this.updateWithUserResponse}
                />
              </div>
              <div className="linebr" />
            </>
          )}
          {/* {this.state.managerQuestions.map(question => <div>{question}</div>)} */}
          <section className="report-results-feed">
            {this.state.responses.map(
              batch =>
                batch.responses.length > 0 && (
                  <div key={batch.date}>
                    {batch.responses.map(response => (
                      <div key={response.userId}>
                        <div className="response-container">
                          <div className="user-info">
                            <div className="month-day">
                              <div className="calendar-top">
                                {moment(batch.date).format("DD")}
                              </div>
                              <div className="calendar-bot">
                                {moment(batch.date).format("MMMM")}
                              </div>
                            </div>
                            <div className="response-container-main-name">
                              {response.fullName}
                            </div>
                          </div>

                          <div className="response-container-main">
                            <div className="vertical-timeline" />
                            <div className="response-content">
                              <ol type="1">
                                  {response.questions.map(
                                    ({ question, answer, id, sentimentRange }) => (
                                      <div key={id} className = "question-response">
                                        <div className="response-container-main-question">
                                        
                                          <li className = "manager-poll-question">{question}</li>
                                          
                                        </div>
                                        {this.state.isSentiment && 
                                        <>
                                            <StyledSlider
                                              className="slider"
                                              value={sentimentRange}
                                              min={1}
                                              max={5}
                                              step={1}
                                            />
                                              <div className="slider-label">
                                                <p className={sentimentRange !=1 ? "deselected" : null}>1</p>
                                                <p className={sentimentRange !=2 ? "deselected" : null}>2</p>
                                                <p className={sentimentRange !=3 ? "deselected" : null}>3</p>
                                                <p className={sentimentRange !=4 ? "deselected" : null}>4</p>
                                                <p className={sentimentRange !=5 ? "deselected" : null}>5</p>
                                              </div>
                                          </>
                                        } 
                                        <p className="response-container-main-answer">
                                          <div className={ "regular-answer"}>{answer}</div>
                                          <div className ="linebr" />
                                        </p>
                                    </div>
                                  )
                                )}{" "}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )}
          </section>
        </main>

        {/* The components below are the circle chart and calendar */}
        <div className="sidebar">
          <CircleProgress
            title="Today's Poll"
            // minorFix
            percentComplete={this.state.historicalSubmissionRate}
          />
          <div className="calendar">
            <h1 className="title">Filter by day</h1>
            <DatePicker
              // getByDate={this.getByDate}
              clickedDate={this.state.clickedDate}
              clickedResponder={this.state.clickedResponder}
              filter={this.filter}
            />
          </div>

          <div className = "responders-component">
            <h1 className="title">Filter by team member</h1>
            {this.state.responders.length == 0 ? <div className="error-message"> no responses yet </div> : <Responders
              responders={this.state.responders}
              filter={this.filter}
              clickedDate={this.state.clickedDate}
              clickedResponder={this.state.clickedResponder}
            />}
          </div>

        </div>
      </div>
    );
  }

  getData = async () => {
    try {
      const userId = jwt_decode(localStorage.getItem("token")).subject;
      // makes 3 api calls to get reports/responses and submission rate
      const [reportRes, responsesRes, submissionRes, managerRes] = await Promise.all([
  
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
          `${baseURL}/responses/managerQuestions/${this.props.match.params.reportId}`
        )
      ]);

      const { isSentiment } = reportRes.data.report;
      // format the submissionRate
      let { historicalSubmissionRate } = submissionRes.data;
      historicalSubmissionRate /= 100;

      let managerQuestions = [];
      let managerResponses = []; 

      managerRes.data.map(res => {
        console.log(res)
        managerQuestions.push(res.managerQuestions)
        managerResponses.push(res.managerResponses)
      })

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
        isSentiment,
        responses: responsesRes.data,
        filteredResponse: filtered,
        responders,
        historicalSubmissionRate,
        managerQuestions: JSON.stringify(managerQuestions),
        managerResponses: JSON.stringify(managerResponses),
      });
<<<<<<< HEAD
      console.log(managerQuestions);
=======
   
>>>>>>> 74f0c9bc6a0e15ea119650b825850f21e6acfb1d
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
    this.setState({ responses: res.data, 
                    completed: true,
                    isComplete: true
                  });
  };
}

export default ReportResults;
