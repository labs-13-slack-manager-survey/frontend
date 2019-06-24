import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../../config/axiosWithAuth";

// style imports
import "./Report.css";
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
import { getHours } from "date-fns";
import { getMinutes } from "date-fns/esm";

// this edits reports - admin only
// Parent component = ReportsDash.js in '/pages/Dashboard/ReportsDash'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 0,
    // marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class EditReport extends Component {
  state = {
    // Main Report State
    reportName: "",
    schedule: [],
    scheduleTime: "",
    timePickDate: new Date("2000-01-01T18:00:00"),
    message: "",
    questions: [],
    sentimentQuestions:[],
    slackChannelId: null,
    // Temporary State
    channels: [],
    question: "",
    sentimentQuestion:"",
    week: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
  };

  componentDidMount() {
    this.fetchSlackChannels();
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        let parseSentiment = JSON.parse(res.data.report.sentimentQuestions)

        const {
          reportName,
          schedule,
          scheduleTime,
          message,
          questions,
          slackChannelId
        } = res.data.report;

        this.setState({
          reportName,
          schedule,
          scheduleTime,
          timePickDate: new Date(`2000-01-01T${scheduleTime}`),
          message,
          questions,
          sentimentQuestions: parseSentiment,
          slackChannelId
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

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

  fetchSlackChannels = () => {
    const endpoint = `${baseURL}/slack/channels`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        this.setState({
          channels: res.data
        });
      })
      .catch(err => console.log(err));
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

  enterSentimentHandler = e => {
    e.preventDefault();
    const code = e.keyCode || e.which;
    if (code === 13) {
      this.setState(prevState => ({
        sentimentQuestions: [...prevState.sentimentQuestions, this.state.sentimentQuestion],
        sentimentQuestion: ""
      }));
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  sentimentHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      sentimentQuestions: [...prevState.sentimentQuestions, this.state.sentimentQuestion],
      sentimentQuestion: ""
    }));
  };

  removeSentiment = (e, sentimentQuestion) => {
    e.preventDefault();
    this.setState(prevState => ({
      sentimentQuestions: prevState.sentimentQuestions.filter(q => q !== sentimentQuestion)
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

  updateReport = e => {
    e.preventDefault();
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
      sentimentQuestions,
      slackChannelId
    } = this.state;
    const report = {
      reportName,
      schedule: JSON.stringify(schedule),
      scheduleTime,
      message,
      questions: JSON.stringify(questions),
      sentimentQuestions: JSON.stringify(sentimentQuestions),
      slackChannelId,
      slackChannelName
    };
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .put(endpoint, report)
      .then(res => {
        this.props.setResponseAsState(res.data);
        this.props.history.push("/slackr/dashboard");
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
        <form className="edit-report">
          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">Survey Information</h3>
              <Divider className="divider" variant="fullWidth" />
              <FormControl className="report-name report-margin" required>
                <InputLabel htmlFor="edit-report-name">Survey Name</InputLabel>
                <Input
                  id="edit-report-name"
                  className="input-field top-input"
                  required
                  type="text"
                  onChange={this.changeHandler}
                  name="reportName"
                  value={this.state.reportName}
                />
              </FormControl>
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
                    required
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
            <section className="schedule-card-content">
              <FormControl className="input-field" required>
                <InputLabel htmlFor="edit-report-message">
                  Survey Message
                </InputLabel>
                <Input
                  required
                  className="input-field margin-fix"
                  id="edit-report-message"
                  type="textarea"
                  onChange={this.changeHandler}
                  name="message"
                  placeholder="Message to be sent with each survey"
                  value={this.state.message}
                />
              </FormControl>
            </section>
          </Card>
          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">Schedule</h3>
              <Divider className="divider" variant="fullWidth" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Days to be Delivered</p>
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
              <h3 className="schedule-title">Questions</h3>
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
                  <InputLabel htmlFor="edit-report-question">
                    Enter a question...
                  </InputLabel>
                  <Input
                    id="edit-report-question"
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


          <Card raised={true} className="schedule-card">
            <section className="schedule-card-content">
              <h3 className="schedule-title">sentiment Questions</h3>
              <Divider className="divider" variant="fullWidth" />
              <section>
                {this.state.sentimentQuestions.map(question => (
                  <article className="question-flex" key={question}>
                    <p className="question">{question}</p>
                    <Fab
                      size="small"
                      color="secondary"
                      onClick={e => this.removeSentiment(e, question)}
                    >
                      <Icon>delete_icon</Icon>
                    </Fab>
                  </article>
                ))}
              </section>
              <section className="enter-question">
                <FormControl className="input-field" required>
                  <InputLabel htmlFor="edit-report-question">
                    Enter a sentiment question...
                  </InputLabel>
                  <Input
                    id="edit-report-question"
                    required
                    className="input-field"
                    type="text"
                    name="sentimentQuestion"
                    value={this.state.sentimentQuestion}
                    onChange={this.enterSentimentHandler}
                  />
                </FormControl>
                <Fab
                  size="small"
                  style={{ display: "block", margin: "10px 0" }}
                  color="primary"
                  onClick={this.sentimentHandler}
                  disabled={this.state.sentimentQuestion.length === 0 ? true : false}
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
            onClick={this.updateReport}
          >
            Update Survey
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditReport);
