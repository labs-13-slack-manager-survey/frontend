import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";
import jwt_decode from "jwt-decode";

// component imports
import MemberResponseForm from "./MemberResponseForm";
import Responders from "../../Responders/Responders";
import DatePicker from "../../DatePicker/DatePicker";
import PageTitle from '../../../components/PageTitle';
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CircleProgress from '../../../components/circleProgress.js';




// style imports
import { Card, Elevation } from "@blueprintjs/core";
import { Fab, Icon } from "@material-ui/core";
import "./ReportResults.css";

const StyledSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#4A90E2",
    border: `3px solid #fff`,
    // "&$focused, &:hover": "none",
    // "&$activated": "none",
    // "&$jumped": "none",
  },
  track: {
    backgroundColor: "#A0CBFF",
    height: 8,
    borderRadius: '10px',
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
    completed: false
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
      title = "Report"
      />
                      <div className="report-results-container-backButton">
          <Fab onClick={() => this.props.history.goBack()} color="default">
            <Icon>arrow_back</Icon>
          </Fab>
        </div>
        {/* <section className="report-results-aside">
          {this.state.filteredResponse.length > 0 ||
          this.state.completed === true ? (
            <Card
              interactive={false}
              elevation={Elevation.TWO}
              className="completed-report"
            >
              <h3>Thank you for filling out this report!</h3>
            </Card>
          ) : (
            <Card
              className="response-card"
              interactive={false}
              elevation={Elevation.TWO}
            >
              <MemberResponseForm
                {...this.props}
                updateWithUserResponse={this.updateWithUserResponse}
              />
            </Card>
          )}

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
        </section> */}


          <section className="report-results-feed">
              {this.state.responses.map(
                batch =>
                  batch.responses.length > 0 && (
                    <div key={batch.date}>
                      <h3 className="report-results-feed-date">
                        {new Date(batch.date)
                          .toLocaleDateString("en-US", options)
                          .replace(",", "")}
                      </h3>
                      {batch.responses.map(response => (

                        <div key={response.userId}>
                          <div className="response-container">
                            <div className = "user-info">
                                <div className = "month-day">
                                {batch.date}
                                </div>
                              {/* <img
                                className="response-container-image"
                                src={response.profilePic}
                                alt={response.fullName}
                              /> */}
                              <div className="response-container-main-name">
                                  {response.fullName}
                              </div>
                            </div>


                            <div className="response-container-main">
                              <div className = "vertical-timeline" />
                              <div className = "response-content">
                                  {response.questions.map(
                                    ({ question, answer, id, sentimentRange }) => (
                                      <div key={id}>
                                        <div className="response-container-main-question">
                                          {question}
                                        </div>
                                        {sentimentRange && 
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
                                          {/* {sentimentRange && <div className="view-comments">Comments:</div>} */}
                                          <div className={sentimentRange ?  "sentiment-comment":null}>{answer}</div>
                                        </p>
                                      </div>
                                    )
                                  )}
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
        <div className = "sidebar">
          <CircleProgress 
          title = "Today's Polls"
          percentComplete = '0.6'/>

          {/* <PollCalendar /> */}
        </div>
                          
      </div>
    );
  }

  componentDidMount() {
    const userId = jwt_decode(localStorage.getItem("token")).subject;

    // axiosWithAuth() 
    //   .get(`${baseURL}/reports/submissionRate/${this.props.match.params.reportId}`)
    //   .then(res=>{
    //     console.log(res);
    //   })

      // .catch(err => console.log(err))
    axiosWithAuth()
      .get(`${baseURL}/responses/${this.props.match.params.reportId}`)
      .then(res => {
        console.log(res);
        const filtered = res.data[0].responses.filter(
          response => response.userId === userId
        );
        // Filter all unique responders and push to state
        const user = [];
        const responders = [];
        res.data.forEach(({ responses }) => {
          responses.length > 0 &&
            responses.forEach(({ userId, profilePic, fullName }) => {
              if (!user.includes(userId)) {
                user.push(userId);
                responders.push({ userId, profilePic, fullName });
              }
            });
        });
        this.setState({
          responses: res.data,
          filteredResponse: filtered,
          responders
        });
      })
      .catch(err => console.log(err));
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
