import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

// imports for time schedule
import { getHours } from "date-fns";
import { getMinutes } from "date-fns/esm";

// style imports
import {
  Card,
  Button,
  Divider,
  Input,
  InputLabel,
  FormControl,
  Fab,
  Icon,
  TextField,
  MenuItem,
  withStyles
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TimePicker } from "material-ui-pickers";

import "./Report.css";

// this component does what it says - admin can create a new report
// Parent component = ReportsDash.js in '/components/Dashboard/ReportsDash'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class CreatePoll extends Component {
  state = {
    // Main Report State
    reportName: "Sentiment Poll",
    schedule: [],
    scheduleTime: "8:0",
    timePickDate: new Date("2000-01-01T08:00:00"),
    message: "Please respond to the poll ASAP.",
    errorMessage: "",
    questions: [],
    slackChannelId: null,
    slackAuthorized: false,
    managerQuestions: "no",
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

  //function for questions
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

  //function for questions
  questionsHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: [...prevState.questions, this.state.question],
      question: ""
    }));
  };

    //function for questions
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

  addReport = e => {
    e.preventDefault();

    if (this.state.reportName.length < 1) {
      this.setState({
        errorMessage: "Please enter your report name in the respective field"
      });
      return this.state.message;
    }

    if (this.state.schedule.length < 1) {
      this.setState({
        errorMessage: "Please choose at least one day two send out your report"
      });
      return this.state.message;
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
      slackChannelId
    } = this.state;
    const report = {
      reportName,
      schedule: JSON.stringify(schedule),
      scheduleTime,
      message,
      questions: JSON.stringify(questions),
      slackChannelId,
      slackChannelName,
      created_at: new Date()
    };
    const endpoint = `${baseURL}/reports`;
    axiosWithAuth()
      .post(endpoint, report)
      .then(res => {
        this.props.setResponseAsState(res.data);

        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="create-report">
        <Fab onClick={() => this.props.history.goBack()} color="default">
          <Icon>arrow_back</Icon>
        </Fab>
        <form className="create-report">
          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">Report Information</h3>
              <Divider className="divider" variant="fullWidth" />
              <FormControl className="report-name report-margin" required>
                <InputLabel htmlFor="report-name">Report Name</InputLabel>
                <Input
                  id="report-name"
                  className="input-field"
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
                  <InputLabel htmlFor="report-message">
                    Report Message
                  </InputLabel>
                  <Input
                    required
                    className="input-field"
                    id="report-message"
                    type="textarea"
                    onChange={this.changeHandler}
                    name="message"
                    placeholder="Message to be sent with each report"
                    value={this.state.message}
                  />
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
          </Card>
          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">Delivery Schedule</h3>
              <Divider className="divider" variant="fullWidth" />
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
          </Card>
          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">Poll Questions</h3>
              <Divider className="divider" variant="fullWidth" />
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
          </Card>
          <Button
            style={{ display: "block", marginTop: "30px" }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.addReport}
            disabled={this.state.questions.length === 0 ? true : false}
          >
            Create Report
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreatePoll);
