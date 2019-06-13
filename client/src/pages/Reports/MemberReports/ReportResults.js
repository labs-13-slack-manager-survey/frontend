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
    historicalSubmissionRate: 0
  };

  render() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

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

          <section className="report-results-feed">
            {this.state.responses.map(
              batch =>
                batch.responses.length > 0 && (
                  <div key={batch.date}>
                    {/* <h3 className="report-results-feed-date">
                        {new Date(batch.date)
                          .toLocaleDateString("en-US", options)
                          .replace(",", "")}
                      </h3> */}
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
                                      <div key={id}>
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
                                      {/* </div>
                                      {this.state.isSentiment && (
                                        <>
                                          <StyledSlider
                                            className="slider"
                                            value={sentimentRange}
                                            min={1}
                                            max={5}
                                            step={1}
                                          />
                                          <div className="slider-label">
                                            <p
                                              className={
                                                sentimentRange != 1
                                                  ? "deselected"
                                                  : null
                                              }
                                            >
                                              1
                                            </p>
                                            <p
                                              className={
                                                sentimentRange != 2
                                                  ? "deselected"
                                                  : null
                                              }
                                            >
                                              2
                                            </p>
                                            <p
                                              className={
                                                sentimentRange != 3
                                                  ? "deselected"
                                                  : null
                                              }
                                            >
                                              3
                                            </p>
                                            <p
                                              className={
                                                sentimentRange != 4
                                                  ? "deselected"
                                                  : null
                                              }
                                            >
                                              4
                                            </p>
                                            <p
                                              className={
                                                sentimentRange != 5
                                                  ? "deselected"
                                                  : null
                                              }
                                            >
                                              5
                                            </p>
                                          </div>
                                        </>
                                      )} */}
                                      <p className="response-container-main-answer">
                                        <div className={"regular-answer"}>
                                          {answer}
                                        </div>
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
            minorFix
            percentComplete={this.state.historicalSubmissionRate}
          />
          <Card
            interactive={false}
            elevation={Elevation.TWO}
            style={{ marginTop: "30px" }}
            className="report-results-filter-container"
          >
            <h1 className="report-results-filter">Filter by day</h1>
            <DatePicker
              // getByDate={this.getByDate}
              clickedDate={this.state.clickedDate}
              clickedResponder={this.state.clickedResponder}
              filter={this.filter}
            />
            <h1 className="report-results-filter">Filter by team member</h1>
            <Responders
              responders={this.state.responders}
              filter={this.filter}
              clickedDate={this.state.clickedDate}
              clickedResponder={this.state.clickedResponder}
            />
          </Card>
        </div>
      </div>
    );
  }

  getData = async () => {
    try {
      const userId = jwt_decode(localStorage.getItem("token")).subject;
      // makes 3 api calls to get reports/responses and submission rate
      const [reportRes, responsesRes, submissionRes] = await Promise.all([
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
        )
      ]);
      const { isSentiment } = reportRes.data.report;
      // format the submissionRate
      let { historicalSubmissionRate } = submissionRes.data;
      historicalSubmissionRate /= 100;
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
        historicalSubmissionRate
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getData();
    axiosWithAuth()
      .get(`${baseURL}/submissionRate/${this.props.match.params.reportId}`)
      .then(res => {
        const percent = res.data.historicalSubmissionRate;
        this.setState({
          percentComplete: percent,
        })
        console.log(percent)
      })

    // axiosWithAuth()
    //   .get(`${baseURL}/responses/${this.props.match.params.reportId}`)
    //   .then(res => {
    //     console.log("RES++__++",res);
    //     const filtered = res.data[0].responses.filter(
    //       response => response.userId === userId
    //     );
    //     // Filter all unique responders and push to state
    //     const user = [];
    //     const responders = [];
    //     res.data.forEach(({ responses }) => {
    //       responses.length > 0 &&
    //         responses.forEach(({ userId, profilePic, fullName }) => {
    //           if (!user.includes(userId)) {
    //             user.push(userId);
    //             responders.push({ userId, profilePic, fullName });
    //           }
    //         });
    //     });
    //     this.setState({
    //       responses: res.data,
    //       filteredResponse: filtered,
    //       responders
    //     });
    //   })
    //   .catch(err => console.log(err));
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
    this.setState({ responses: res.data, completed: true });
  };
}

export default ReportResults;
