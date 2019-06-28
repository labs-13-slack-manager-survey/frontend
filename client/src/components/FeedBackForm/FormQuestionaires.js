import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import withCardStyles from "./withCardStyles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    width: "100%",
    maxWidth: 500
  },
  feedbackQuestion: {
    backgroundColor: "black",
  }
}));
const FormQuestionaires = ({ nextStep, prevStep, values, handleChange }) => {
  const continueNext = e => {
    e.preventDefault();
    nextStep();
  };
  const goBack = e => {
    e.preventDefault();
    prevStep();
  };
  const classes = useStyles();
  return (
    <>
      <TextField
      className={classes.feedbackQuestion}
        margin="normal"
        className={classes.input}
        name="like"
        label="What errors or issues did you encounter using the app?"
        onChange={handleChange}
        variant="outlined"
        multiline
        rowsMax="4"
        value={values.like}
      />
      <TextField
      className={classes.feedbackQuestion}
      margin="normal"
        className={classes.input}
        name="dislike"
        label="What are some features you'd like improved upon?"
        onChange={handleChange}
        variant="outlined"
        multiline
        rowsMax="4"
        value={values.dislike}
      />

      <TextField
      className={classes.feedbackQuestion}
      margin="normal"
        className={classes.input}
        name="additional"
        label="Ideas for aditional features and functionality?"
        onChange={handleChange}
        variant="outlined"
        multiline
        rowsMax="4"
        value={values.additional}
      />
      <Button color="primary" onClick={continueNext}>
        Next
      </Button>{" "}
      <Button color="primary" onClick={goBack}>
        Back
      </Button>
    </>
  );
};

export default withCardStyles(FormQuestionaires);
