import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
    <>
      <List>
        <ListItem>
          <ListItemText>Name:{values.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Email:{values.email}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Likes:{values.like}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Dislikes:{values.dislike}</ListItemText>
        </ListItem>
      </List>
      <Button color="primary" onClick={continueNext}>
        Submit
      </Button>
      <Button color="primary" onClick={goback}>
        Back
      </Button>
    </>
  );
};

export default withCardStyles(Confirm);
