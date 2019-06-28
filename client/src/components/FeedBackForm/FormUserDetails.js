import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withCardStyles from "./withCardStyles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    width: "100%",
    maxWidth: 500
  }
}));
const FormUserDetails = ({ nextStep, prevStep, values, handleChange }) => {
  const continueNext = e => {
    nextStep();
  };
  const classes = useStyles();
  return (
    <>
      <TextField
        margin="normal"
        className={classes.input}
        label="Name"
        name="name"
        onChange={handleChange}
        variant="outlined"
        value={values.name}
      />
      <TextField
        margin="normal"
        className={classes.input}
        label="Email"
        name="email"
        onChange={handleChange}
        variant="outlined"
        value={values.email}
      />
      <Button color="primary" onClick={continueNext}>
        Next
      </Button>
    </>
  );
};

export default withCardStyles(FormUserDetails);
