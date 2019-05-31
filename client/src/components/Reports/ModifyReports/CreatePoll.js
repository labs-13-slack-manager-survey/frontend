import React, { Component } from "react";
import { withStyles, Fab, Icon } from "@material-ui/core";

import "./Report.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class CreatePoll extends Component {
  render() {
    return (
      <div className="create-report">
        <Fab onClick={() => this.props.history.goBack()} color="default">
          <Icon>arrow_back</Icon>
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(CreatePoll);
