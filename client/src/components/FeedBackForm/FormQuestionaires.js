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
        margin="normal"
        className={classes.input}
        name="like"
        label="What did you like the most?"
        onChange={handleChange}
        variant="outlined"
        multiline
        rowsMax="4"
        value={values.like}
      />
      <TextField
        margin="normal"
        className={classes.input}
        name="dislike"
        label="What did you dislike the most?"
        onChange={handleChange}
        variant="outlined"
        multiline
        rowsMax="4"
        value={values.dislike}
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
