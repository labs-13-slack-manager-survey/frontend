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
import ToggleOn from "../../../images/icons/chevron-down.png";
import ToggleOff from "../../../images/icons/chevron-up.png";

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
    managerCompleted: false,
    isComplete:false,
    isSentiment: false,
    secondaryPage: true,
    isManagerActivated: true,
    percentComplete: 0,
    historicalSubmissionRate: 0,
    managerQuestions: [],
    managerResponses: [], 
    managerSubmitted: [],
    managerFeedback: [],
    seeManagerQ: true,
    seeManagerQList: false, 
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

  getDate = (date) => {
    let formatted = moment(date).format('DD MMMM YYYY');
    return formatted;
  }

  render() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    // console.log("REPORT RESULT STATE",this.state)
    // console.log(this.state.managerQuestions)
    
    let managerPollDays = [];

    for (let i = 0; i < this.state.managerFeedback.length; i++ ){
        let managerQandA = {};
        managerQandA.managerQuestions = JSON.parse(this.state.managerFeedback[i].managerQuestions);
        managerQandA.managerResponses= JSON.parse(this.state.managerFeedback[i].managerResponses);
        managerQandA.managerSubmitted = this.state.managerFeedback[i].submitted_date;
        managerPollDays.push(managerQandA);
    }
    
    console.log(managerPollDays)

    console.log(this.state.managerQuestions)
    
    //calculating date of the manager report 
    const token = jwt_decode(localStorage.getItem('token'));

    let today = new Date();
    today = moment(today).format('DD MMMM YYYY');

    let today2 = new Date();
    today2 = moment(today).format('DD MMMM YYYY');

    
    let managerToday = managerPollDays.length && managerPollDays[managerPollDays.length-1].managerSubmitted
    // let managerToday = this.state.managerFeedback.length && this.getDate(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date) != today
    managerToday = moment(managerToday).format('DD MMMM YYYY');

    console.log(managerToday)
    console.log(today)
    console.log(this.state.managerFeedback)

    return (
      <div className="dashboard-view">
        <main className="view">
          
          <PageTitle
            title="Report"
            {...this.props}
            secondaryPage={this.state.secondaryPage}
          />
          
          {token.roles != "admin" && this.state.isManagerActivated ? 
            <div className="confirm-response" >
                {managerToday != today || this.state.filteredResponse.length > 0 ? <div> {this.state.filteredResponse.length > 0 ? "Your response has been recorded" :  "Poll unavailable: No manager response has been recorded for today" } </div> 
                : 
                  <>
                  <div classname="manager-feedback-for-users" onClick = {this.toggleManagerQ}>
                    <div className="poll-header">
                      <div className = "toggle-manager-questions">
                          <div className="member-form-title">Manager Comments</div>
                          <img
                          className="manager-toggle"
                          src={this.state.seeMangerQ ? ToggleOff : ToggleOn }
                        />
                       </div>
                    <p className="member-form-subtitle">
                      View your manager's responses to his poll to guide your responses and goals for the day
                    </p>
                  </div>
                    {this.state.seeManagerQ ? <> 
                      <div className="vertical-line" />
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[0]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[0]}</div> 
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[1]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[1]}</div> 
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[2]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[2]}</div> 
                    {managerPollDays[managerPollDays.length-1].managerQuestions.length === 4 ? <>
                      <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[3]}</div> 
                      <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[3]}</div></> : null }</> : null}

                  </div>
                    </> }
                </div>
            : 
            
            managerToday != today && token.roles === "admin" ?  <div
            className="response-card"
            interactive={false}
            elevation={Elevation.TWO}
          >
            <MemberResponseForm
              {...this.props}
              updateWithUserResponse={this.updateWithManagerResponse}
            /> 
        </div> : null }

          {this.state.filteredResponse.length > 0 ||
          this.state.managerCompleted === true ? (
            <>
              <div className="confirm-response">
                {managerToday != today ? "Your response has been recorded " : 
                <>
                <div classname="manager-feedback">
                  <div className = "user-info">
                    <div className="month-day">
                      <div className="calendar-top">{moment(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date).format("DD")}</div>
                      <div className="calendar-bot">{moment(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date).format("MMMM")}</div>
                    </div>
                    <div className = "manager-response-header-text">
                      <div className = "response-container-main-name-manager">Manager Comments</div>
                    </div>
                  </div>
                  <div className="linebr"/>
                  <div className = "response-content" >
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[0]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[0]}</div> 
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[1]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[1]}</div> 
                    <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[2]}</div> 
                    <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[2]}</div> 
                    {managerPollDays[managerPollDays.length-1].managerQuestions.length === 4 ? <>
                      <div className= "manager-question">{managerPollDays[managerPollDays.length-1].managerQuestions[3]}</div> 
                      <div className= "manager-response">{managerPollDays[managerPollDays.length-1].managerResponses[3]}</div></> : null }
                  </div>
                </div>
              </> 
              }
               
              </div>
              <div className="linebr" />
            </>
          ) : (
            <>
              {managerToday == today ?
                <div
                  className="response-card"
                  interactive={false}
                  elevation={Elevation.TWO}
                >
                  <MemberResponseForm
                    {...this.props}
                    updateWithUserResponse={this.updateWithManagerResponse}
                  /> 
              </div> : null} 
              <div className="linebr" />
            </>
          )}

          <section className="report-results-feed">
          {/* {this.state.managerFeedback.map(res => (
                  <div>{res}</div>
                ))} */}
      
              {managerPollDays.map(res => {
                if (this.getDate(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date) === today) {
                  return null 
                } else {return <>
                    <div className="response-container-manager" onClick={this.toggleManagerQList}>
                      <div className = "user-info">
                        <div className="month-day">
                          <div className="calendar-top">{moment(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date).format("DD")}</div>
                          <div className="calendar-bot">{moment(this.state.managerFeedback[this.state.managerFeedback.length-1].submitted_date).format("MMMM")}</div>
                        </div>
                        <div className = "manager-response-header-text">
                          <div className = "response-container-main-name-manager">Manager Comments</div>
                          <img className="manager-toggle-list" src={this.state.seeManagerQList ? ToggleOn : ToggleOff} />
                        </div>
                      </div>
                      {this.state.seeManagerQList ? <>
                        
                        <div className = "linebr" /><div className="response-container-main">
                        
                        <div className="response-content">
                          <div className= "manager-question">{res.managerQuestions[0]}</div> 
                          <div className= "manager-response ">{res.managerResponses[0]}</div> 
                          <div className ="linebr" />

                          <div className= "manager-question">{res.managerQuestions[1]}</div> 
                          <div className= "manager-response ">{res.managerResponses[1]}</div> 
                          <div className ="linebr" />

                          <div className= "manager-question">{res.managerQuestions[2]}</div> 
                          <div className= "manager-response ">{res.managerResponses[2]}</div> 
                          {res.managerQuestions.length === 4 ? <>
                            <div className ="linebr" />
                            <div className= "manager-question">{res.managerQuestions[3]}</div> 
                            <div className= "manager-response ">{res.managerResponses[3]}</div>
                            </> : null }
                        </div> 
                      </div></> : null }
                    </div>
                    </>
                  }
                }
             
              )}
      
             
            

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

      // let managerQuestions = [];
      // let managerResponses = []; 
      // let managerSubmitted = []; 
      // let managerFeedback= [];
      
      const managerFeedback = [];
      managerRes.data.forEach(feedback => {
        managerFeedback.push({ managerQuestions: feedback.managerQuestions,
           managerResponses: feedback.managerResponses, 
           submitted_date: feedback.submitted_date }); 
       
      })
      console.log(reportRes.data.report.managerQuestions)

      // managerRes.data.map(res => {
      //   console.log(res)
      //   managerQuestions.push(JSON.parse(res.managerQuestions))
      //   managerResponses.push(JSON.parse(res.managerResponses))
      //   managerSubmitted.push(res.submitted_date)
      //   managerFeedback.push({managerQuestions, managerResponses, managerSubmitted})
      // })

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
        isManagerActivated: reportRes.data.report.managerQuestions,
        isSentiment,
        responses: responsesRes.data,
        filteredResponse: filtered,
        responders,
        historicalSubmissionRate,
        // managerQuestions: JSON.parse(managerQuestions),
        // managerResponses: JSON.parse(managerResponses),
        // managerSubmitted: managerSubmitted,
        managerFeedback: managerFeedback,
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
    this.setState({ responses: res.data, 
                    completed: true,
                    isComplete: true
                  });
  };

  updateWithUserResponse = res => {
    this.setState({ responses: res.data, 
                    managerCompleted: true,
                    isComplete: true
                  });
  };
}

export default ReportResults;
