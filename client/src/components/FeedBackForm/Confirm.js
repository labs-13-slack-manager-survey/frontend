import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import withCardStyles from "./withCardStyles";
import "./feedback.css"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    width: "100%",
    maxWidth: 500
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  }
}));
const Confirm = ({ nextStep, prevStep, values, handleSubmit }) => {
  const continueNext = () => {
    handleSubmit();
    nextStep();
  };
  const goback = () => {
    prevStep();
  };
  const classes = useStyles();
  return (
    <ol className = "feedback-list">
      <li className = "listItem">
        <div className="feedback-label">Name: </div>
        <div className = "feedback-content">{values.name}</div>
      </li>
      <li className = "listItem">
        <div className="feedback-label">Email:</div>
        <div className = "feedback-content">{values.email}</div>
      </li>
      <li className = "listItem">
       <div className="feedback-label">Errors and Issues:</div>
       <div className = "feedback-content">{values.like}</div>
      </li>
      <li className = "listItem">
        <div className="feedback-label">Improvements:</div>
        <div className = "feedback-content">{values.dislike}</div>
      </li>
      <li className = "listItem">
        <div className="feedback-label">Additional Features:</div>
        <div className = "feedback-content">{values.dislike}</div>
      </li>

      <Button color="primary" onClick={continueNext}>
        Submit
      </Button>
      <Button color="primary" onClick={goback}>
        Back
      </Button>
    </ol>
  );
};

export default withCardStyles(Confirm);
