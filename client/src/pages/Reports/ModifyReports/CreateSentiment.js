import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";
import Slider from "@material-ui/lab/Slider";
import { fade } from "@material-ui/core/styles/colorManipulator";


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
import PageTitle from '../../../components/PageTitle'
import PollDescription from '../../../components/PollDescription'


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
  }
});

const StyledSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#F67B28",
    border: `3px solid #fff`,
    "&$focused, &:hover": {
      boxShadow: `0px 0px 0px ${8}px ${fade("#de235b", 0.16)}`
    },
    "&$activated": {
      boxShadow: `0px 0px 0px ${6}px ${fade("#de235b", 0.16)}`
    },
    "&$jumped": {
      boxShadow: `0px 0px 0px ${2}px ${fade("#de235b", 0.16)}`
    }
  },
  track: {
    backgroundColor: "#FEBA47",
    height: 8
  },
  trackAfter: {
    backgroundColor: "#d0d7dc"
  }
})(Slider);

class CreateSentiment extends Component {
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
    isSentiment: true,
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
    exampleSentiment: "3", 
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
      slackChannelId,
      isSentiment
    } = this.state;

    const report = {
      reportName,
      schedule: JSON.stringify(schedule),
      scheduleTime,
      message,
      questions: JSON.stringify(questions),
      slackChannelId,
      slackChannelName,
      created_at: new Date(),
      isSentiment
    };

    const endpoint = `${baseURL}/reports`;
    axiosWithAuth()
      .post(endpoint, report)
      .then(res => {
        this.props.setResponseAsState(res.data);

        this.props.history.push("/slackr/dashboard");
      })
      .catch(err => console.log(err));
  };

  handleSentimentExample = (event, value) => {
    this.setState(prevState => ({
      ...prevState,
      exampleSentiment: value,
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="create-report">
        <PageTitle 
          title = "New Sentiment Poll"
          {...this.props}
          secondaryPage = {true}
        />
        <PollDescription description= "Create a sentiment survey of questions to capture how your team feels about their work on a scale of 1-5. Respondents will also have the option of including additional comments to accompany their response."/>
        <div className = "response-card-example">
            <div className = "response-question">Sample: How confident are you feeling about completing the tasks assigned to you today?</div>
            <StyledSlider
              className="slider"
              value={this.state.exampleSentiment}
              min={1}
              max={5}
              step={1}
              // onChange={e => this.props.handleChange(e, this.props.question)}
              onChange={(e, v) =>
                this.handleSentimentExample(e, v)
              }
            />
            <div className="slider-label">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </div>

        </div>
        
        <div className = "linebr" />
        <div className = "vertical-line" />
        <div className = "linebr" />
        <section className="response-card">
            <section className="manager-poll-responses">
              <div className="member-form-title">Poll Information</div>
              <div className = "poll-section-description">Name and describe your poll</div>
              <FormControl className="report-name report-margin" required>
                <div className= "manager-poll-question">Poll Name*</div>
                <TextField
                  fullWidth={true} 
                  variant ="outlined"
                  multiline = {true}
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
                <div className ="poll-answer-field"><div className= "manager-poll-question">Description</div>
                  <TextField
                    fullWidth={true} 
                    variant ="outlined"
                    multiline = {true}
                    required
                    className="input-field"
                    id="report-message"
                    type="textarea"
                    onChange={this.changeHandler}
                    name="message"
                    placeholder="Message to be sent with each report"
                    value={this.state.message}
                  /></div>
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


          <div className = "linebr" />
          <section className="response-card">
            <section className="manager-poll-responses">
              <div className="member-form-title">Delivery schedule</div>
              <div className = "poll-section-description">When would you like the poll to be sent out to your team?</div>

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
          </section>
          
          <div className="linebr" />
          <section className="response-card">
            <section className="manager-poll-responses">
            <div className="member-form-title">Poll Questions</div>
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
            disabled={this.state.questions.length === 0 ? true : false}
          >
            Create Report
          </Button>

      </div>
    );
  }
}

export default withStyles(styles)(CreateSentiment);
