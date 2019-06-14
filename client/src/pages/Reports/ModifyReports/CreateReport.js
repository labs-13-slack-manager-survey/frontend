import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

// imports for time schedule
import { getHours } from "date-fns";
import { getMinutes } from "date-fns/esm";

// style imports
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Fab,
  Icon,
  TextField,
  withStyles,
  Menu
} from "@material-ui/core";
import PageTitle from "../../../components/PageTitle";
import PollDescription from "../../../components/PollDescription";
import ToggleOn from "../../../images/icons/toggle-on.png";
import ToggleOff from "../../../images/icons/toggle-off.png";
import ReportInput from "../MemberReports/ReportInput.js";

import MemberResponseForm from "../MemberReports/MemberResponseForm";

//importing things from material-ui
import MenuItem from "@material-ui/core/MenuItem";
import { TimePicker } from "material-ui-pickers";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AddIcon from "@material-ui/icons/Add";

import "./Report.css";

// this component does what it says - admin can create a new report
// Parent component = ReportsDash.js in '/pages/Dashboard/ReportsDash'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 0,
    width: 200
  },
  menu: {
    width: 200
  },
  input: {
    margin: theme.spacing(1)
  }
});

class CreateReport extends Component {
  state = {
    //Questions for survey with new menu
    questionExperience: ["Marketing Team", "Dev Team"],
    // Main Report State
    reportName: "Daily Standup",
    schedule: [],
    scheduleTime: "8:0",
    timePickDate: new Date("2000-01-01T08:00:00"),
    message: "Please fill out your report by the end of the day!",
    errorMessage: "",
    responseM: "",
    questions: [],
    managerResponses: [],
    resOne: "",
    resTwo: "",
    resThree: "",
    resFour: "",
    slackChannelId: null,
    slackAuthorized: false,
    managerQuestions: false,

    isSentiment: false,
    //array for listing manager questions
    listSurveyQuestions: [
      "How did you feel about yesterday?",
      "What are you going to be working on today?",
      "Did you have any blockers yesterday?",
      "How are you feeling about your contribution so far?",
      "Are you happy with your teams contribution to this sprint?"
    ],
    // Temporary State
    channels: [],
    question: "",
    week: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    hidden: true,
    managerType: 0,
    typeOfManager: ["Engineering Manager", "Project Manager"],
    //set manager questions here as well as type of manager BEFORE you add to the managerType
    EngineeringManagerQuestions: [
      "What input or feedback would you like to share with the team?",
      "What are the top priorities the team should be working on today?",
      "As manager, what will you be working on to support the team?"
    ],
    ProjectManagerQuestions: [
      "What input or feedback would you like to share with the team?",
      "What do you think is the most critical part of the objective for today?",
      "What are the blockers you are facing that will hinder project progress or success?",
      "What upcoming demos or requirements does the team need to know about?"
    ]
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  timeChangeHandler = date => {
    const hours = getHours(date);
    const min = getMinutes(date);
    const militaryTime = `${hours}:${min}`;

    this.setState({
      scheduleTime: militaryTime,
      timePickDate: date
    });
  };

  componentDidMount() {
    this.fetchSlackChannels();
  }

  fetchSlackChannels = () => {
    const endpoint = `${baseURL}/slack/channels`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        this.setState({
          channels: res.data,
          slackChannelId: res.data[0].id || ""
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  enterQuestionsHandler = e => {
    e.preventDefault();
    const code = e.keyCode || e.which;
    if (code === 13) {
      this.setState(prevState => ({
        questions: [...prevState.questions, this.state.question],
        question: ""
      }));
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  questionsHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: [...prevState.questions, this.state.question],
      question: ""
    }));
  };

  removeQuestion = (e, question) => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: prevState.questions.filter(q => q !== question)
    }));
  };

  updateSchedule = day => {
    const { schedule } = this.state;
    const includes = schedule.includes(day);
    this.setState({
      schedule: includes ? schedule.filter(d => d !== day) : [...schedule, day]
    });
  };

  selectWeekdays = () => {
    this.setState({
      schedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    });
  };

  //function sends reports. This will also render within MemberResponseForm.js
  addReport = e => {
    e.preventDefault();

    if (this.state.reportName.length < 1) {
      this.setState({
        errorMessage: "Please enter your report name in the respective field"
      });
      console.log(this.state.errorMessage);
      return this.state.errorMessage;
    }

    if (this.state.schedule.length < 1) {
      this.setState({
        errorMessage: "Please choose at least one day two send out your report"
      });
      console.log(this.state.errorMessage);
      console.log(this.state.managerQuestions);
      return this.state.errorMessage;
    }

    if (this.state.managerQuestions) {
      console.log(this.state.resOne);
      if (
        this.state.resOne == "" ||
        this.state.resTwo == "" ||
        this.state.resThree == ""
      ) {
        this.setState({
          errorMessage: "Please enter all answers to the manager polls "
        });
        console.log(this.state.managerQuestions);
        console.log("hello");
        console.log(this.state.errorMessage);
        return this.state.errorMessage;
      }
    }

    let slackChannelName;
    this.state.channels.forEach(channel => {
      if (channel.id === this.state.slackChannelId)
        slackChannelName = channel.name;
    });

    const {
      reportName,
      schedule,
      scheduleTime,
      message,
      questions,
      slackChannelId,
      managerResponses,
      EngineeringManagerQuestions,
      ProjectManagerQuestions
    } = this.state;
    console.log("mRes", managerResponses);
    let report = {
      reportName,
      schedule: JSON.stringify(schedule),
      scheduleTime,
      message,
      questions: JSON.stringify(questions),
      managerResponses: JSON.stringify(managerResponses),
      slackChannelId,
      slackChannelName,
      created_at: new Date()
    };
    console.log("REPORT++", this.report);
    this.state.managerType === 0
      ? (report["managerQuestions"] = JSON.stringify(
          EngineeringManagerQuestions
        ))
      : (report["managerQuestions"] = JSON.stringify(ProjectManagerQuestions));
    console.log("mres after", report.managerResponses);
    const endpoint = `${baseURL}/reports`;

    axiosWithAuth()
      .post(endpoint, report)
      .then(res => {
        this.props.setResponseAsState(res.data);

        this.props.history.push("/slackr/dashboard");
      })
      .catch(err => console.log(err));
  };

  handleButton = e => {
    e.preventDefault();
  };

  handleOpenCloseDropdown() {
    this.setState({
      hidden: !this.state.hidden
    });
  }
  handleMenuItemClick(event, index) {
    this.state({ selectedItem: index });
  }

  managerType = e => {
    e.preventDefault();
    this.setState({ managerType: e.target.value });
  };

  aQuestion = e => {
    e.preventDefault();
    this.setState({ aQuestion: e.target.value });
  };

  questionsHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: [...prevState.questions, this.state.question],
      question: ""
    }));
  };

  removeQuestion = (e, question) => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: prevState.questions.filter(q => q !== question)
    }));
  };

  addQuestions = e => {
    e.preventDefault();

    this.setState({
      managerResponses: [
        this.state.resOne,
        this.state.resTwo,
        this.state.resThree,
        this.state.resFour
      ]
    });

    console.log(this.state.managerResponses);
  };

  //toggle manager questions
  toggleManagerQ = () => {
    this.setState({
      managerQuestions: !this.state.managerQuestions
    });
  };

  //chandle changes with manager questions
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //this is for rendering the manager questions at top of the report
  renderManagerQuestions = () => {
    if (this.state.managerQuestions) {
      return (
        <>
          <PopupState variant="popover" popupId="demoMenu">
            {popupState => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  {this.state.managerType === 0
                    ? "Engineering Manager"
                    : "Project Manager"}
                </Button>
                <Menu {...bindMenu(popupState)} onClick={this.managerType}>
                  {this.state.typeOfManager.map((type, index) => (
                    <MenuItem
                      key={index}
                      onClick={popupState.close}
                      value={index}
                    >
                      {" "}
                      {type}{" "}
                    </MenuItem>
                  ))}
                </Menu>

                {/* conditionally rendering manager questions to reflect who is manager */}
                {this.state.managerType === 0 ? (
                  //questions for Engineering manager

                  <div>
                    <ol>
                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.EngineeringManagerQuestions[0]}
                          </div>
                        </li>
                        <FormControl className="input-field" required>
                          <TextField
                            fullWidth={true}
                            variant="outlined"
                            multiline={true}
                            id="report-question"
                            className={
                              this.state.resOne
                                ? "input-field"
                                : "input-field-empty"
                            }
                            type="text"
                            required={true}
                            name="resOne"
                            placeholder="Enter your response here"
                            value={this.state.resOne}
                            onChange={this.handleChange}
                            onSubmit={this.add}
                          />
                        </FormControl>
                      </div>
                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.EngineeringManagerQuestions[1]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resTwo
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resTwo"
                          placeholder="Enter your response here"
                          value={this.state.resTwo}
                          onChange={this.handleChange}
                          onSubmit={this.add}
                        />
                      </div>
                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.EngineeringManagerQuestions[2]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resThree
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resThree"
                          placeholder="Enter your response here"
                          value={this.state.resThree}
                          onChange={this.handleChange}
                          onSubmit={this.add}
                        />
                      </div>
                    </ol>
                  </div>
                ) : (
                  //questions for marketing manager
                  <ol>
                    <div>
                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.ProjectManagerQuestions[0]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resOne
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resOne"
                          placeholder="Enter your response here"
                          value={this.state.resOne}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.ProjectManagerQuestions[1]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resTwo
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resTwo"
                          placeholder="Enter your response here"
                          value={this.state.resTwo}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.ProjectManagerQuestions[2]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resThree
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resThree"
                          placeholder="Enter your response here"
                          value={this.state.resThree}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="poll-answer-field">
                        <li>
                          <div className="manager-poll-question">
                            {this.state.ProjectManagerQuestions[3]}
                          </div>
                        </li>
                        <TextField
                          fullWidth={true}
                          variant="outlined"
                          multiline={true}
                          id="report-question"
                          className={
                            this.state.resFour
                              ? "input-field"
                              : "input-field-empty"
                          }
                          type="text"
                          name="resFour"
                          placeholder="Enter your response here"
                          value={this.state.resFour}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </ol>
                )}

                <Button
                  style={{ display: "block", marginTop: "30px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.addQuestions}
                >
                  Add Responses
                </Button>
              </React.Fragment>
            )}
          </PopupState>
        </>
      );
    }
  };

  //this is for rendering the survey questions at the bottom of the report
  RenderSurveyQuestions = () => {
    return (
      <>
        <PopupState variant="popover" popupId="demoMenu">
          {popupState => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Select Survey Template
              </Button>
              <Menu {...bindMenu(popupState)} onClick={this.aQuestion}>
                {this.state.questionExperience.map((type, index) => (
                  <MenuItem
                    key={index}
                    onClick={popupState.close}
                    value={index}
                  >
                    {" "}
                    {type}{" "}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="create-report">
        <PageTitle
          title="New Standup Survey"
          {...this.props}
          secondaryPage={true}
        />
        <PollDescription description="Create your own standup survey with custom questions to be sent out to your team at a scheduled time." />
        <section className="response-card">
          {/* Checks if admin wants manager questions answered */}
          <div className="manager-poll-responses">
            <FormControl>
              <div onClick={this.toggleManagerQ}>
                <div className="toggle-manager-questions">
                  <div className="member-form-title">
                    Manager Questions (Optional)
                  </div>
                  <img
                    className="manager-toggle"
                    src={this.state.managerQuestions ? ToggleOn : ToggleOff}
                  />
                </div>
                <div className="poll-section-description">
                  Answer some questions about your goals for the team to help
                  them prioritize their tasks. These will be displayed at the
                  top of the survey sent out to them.
                </div>
              </div>
              {this.renderManagerQuestions()}
            </FormControl>
          </div>
        </section>

        <div className="linebr" />
        <section className="response-card">
          <section className="manager-poll-responses">
            <div className="member-form-title">Report Information</div>
            <div className="poll-section-description">
              Name and describe your report
            </div>
            <FormControl className="report-name report-margin" required>
              <div
                className={
                  this.state.reportName ? "manager-poll-question" : "incomplete"
                }
              >
                Report Name*
              </div>
              <TextField
                fullWidth={true}
                variant="outlined"
                multiline={true}
                id="report-name"
                className={
                  this.state.reportName ? "input-field" : "input-field-empty"
                }
                required
                type="text"
                onChange={this.changeHandler}
                name="reportName"
                placeholder="Report Name"
                value={this.state.reportName}
              />
            </FormControl>
            <section>
              <FormControl className="input-field" required>
                <div className="poll-answer-field">
                  <div className="manager-poll-question">Description</div>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    multiline={true}
                    required
                    className="input-field"
                    id="report-message"
                    type="textarea"
                    onChange={this.changeHandler}
                    name="message"
                    placeholder="Message to be sent with each report"
                    value={this.state.message}
                  />
                </div>
              </FormControl>
            </section>

            <section>
              {this.state.channels.length > 0 ? (
                <div>
                  <p>Slack Channel</p>
                  <TextField
                    id="select-currency"
                    select
                    label="Select"
                    name="slackChannelId"
                    className={classes.textField}
                    value={this.state.slackChannelId}
                    onChange={this.changeHandler}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select your slack channel"
                    margin="normal"
                  >
                    {this.state.channels.map(channel => (
                      <MenuItem key={channel.id} value={channel.id}>
                        {channel.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              ) : null}
            </section>
          </section>
        </section>

        <div className="linebr" />
        <section className="response-card">
          <section className="manager-poll-responses">
            <div className="member-form-title">Delivery schedule</div>
            <div className="poll-section-description">
              When would you like the survey to be sent out to your team?
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ marginTop: "40px" }}>Days</p>
              <Button
                style={{ marginTop: "20px" }}
                variant="outlined"
                onClick={() => this.selectWeekdays()}
              >
                Select Weekdays
              </Button>
            </div>
            <section className="days-flex">
              {this.state.week.map((day, idx) => (
                <div
                  key={day}
                  onClick={e => this.updateSchedule(day)}
                  className={`day ${
                    this.state.schedule.includes(day) ? "selected" : ""
                  }`}
                  // style={{ width: 0 }}
                >
                  {/* if M/W/F, only show first letter, otherwise first 2 */}
                  {idx === 0 || idx === 2 || idx === 4
                    ? day.charAt(0)
                    : day.charAt(0) + day.charAt(1)}
                </div>
              ))}
            </section>
            <p>Time</p>
            <section>
              <TimePicker
                name="scheduleTime"
                value={this.state.timePickDate}
                minutesStep={30}
                onChange={this.timeChangeHandler}
              />
            </section>
          </section>
        </section>

        <div className="linebr" />
        <section className="response-card">
          <section className="manager-poll-responses">
            <div className="member-form-title">Survey Questions</div>
            <section>
              {this.state.questions.map(question => (
                <article className="question-flex" key={question}>
                  <p className="question">{question}</p>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={e => this.removeQuestion(e, question)}
                  >
                    <Icon>delete_icon</Icon>
                  </Fab>
                </article>
              ))}
            </section>
            <section className="enter-question">
              <FormControl className="input-field" required>
                <InputLabel htmlFor="report-question">
                  Enter a question...
                </InputLabel>
                <Input
                  id="report-question"
                  required
                  className="input-field"
                  type="text"
                  name="question"
                  value={this.state.question}
                  onChange={this.enterQuestionsHandler}
                />
              </FormControl>
              <Fab
                size="small"
                style={{ display: "block", margin: "10px 0" }}
                color="primary"
                onClick={this.questionsHandler}
                disabled={this.state.question.length === 0 ? true : false}
                type="submit"
              >
                <AddIcon />
              </Fab>
            </section>
          </section>
        </section>

        <Button
          style={{ display: "block", marginTop: "30px" }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.addReport}
        >
          Create Report
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(CreateReport);
