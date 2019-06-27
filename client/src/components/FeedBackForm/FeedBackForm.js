import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormQuestionaires from "./FormQuestionaires";
import ThankYou from "./ThankYou";
import Confirm from "./Confirm";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";
import "./feedback.css"
export class FeedBackForm extends Component {
  state = {
    step: 1,
    name: "",
    email: "",
    like: "",
    dislike: ""
  };
  // proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  handleSubmit = async () => {
    try {
      const { name, email, like, dislike } = this.state;
      const mail = { name, email, like, dislike };
      await axiosWithAuth().post(`${baseURL}/email/sendFeedBack`, mail);
    } catch (err) {
      throw new Error(err);
    }
  };
  // updates the state with input form data
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // redirect back to survey page
  backToSurvey = () => {
    this.props.history.push("/slackr/dashboard");
  };
  // determines which component to render based on the step
  renderSwitch = (step, values) => {
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormQuestionaires
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            values={values}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleSubmit={this.handleSubmit}
          />
        );
      case 4:
        return <ThankYou values={values} backToSurvey={this.backToSurvey} />;
      default:
        return `something went wrong D:`;
    }
  };
  render() {
    const { step, name, email, like, dislike } = this.state;
    const values = {
      name,
      email,
      like,
      dislike
    };
    return (
      <div className="dashboard-view">
        <div className="view">
          <h1 className="title-box">
            We would like your feedback to improve our website!
          </h1>
          {this.renderSwitch(step, values)}
        </div>
      </div>
    );
  }
}

export default FeedBackForm;
