import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import withCardStyles from "./withCardStyles";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    border: "1px solid red"
  },
  title: {
    fontSize: 30,
    textTransform: "uppercase"
  }
}));
const ThankYou = ({ backToSurvey }) => {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.title}>Thank You!</h1>
      <Button className={classes.button} onClick={backToSurvey}>
        Back to Dashboard
      </Button>
    </>
  );
};

export default withCardStyles(ThankYou);
