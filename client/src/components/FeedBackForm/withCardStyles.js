import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    maxWidth: 760,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    boxShadow: "0px 0px 10px rgb(240, 240, 240)",
  }
}));
const withCardStyles = Component => props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Component {...props} />
    </Card>
  );
};

export default withCardStyles;
