import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles, Card, Button, Divider } from "@material-ui/core";

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

class ChooseReport extends Component {
  render() {
    return (
      <Card raised={true} className="create-report">
        <section className="schedule-card-content">
          <h3 className="schedule-title">What report do you want to create?</h3>
          <Divider className="divider" variant="fullWidth" />
          <section>
            <Link to="/dashboard/reports/new">
              <Button variant="outlined" style={{ marginTop: "20px" }}>
                Create Standup Survey
              </Button>
            </Link>
          </section>
          <section>
            <Link to="/dashboard/reports/createSentiment">
              <Button variant="outlined" style={{ marginTop: "20px" }}>
                Create Sentiment Poll
              </Button>
            </Link>
          </section>
        </section>
      </Card>
    );
  }
}

export default withStyles(styles)(ChooseReport);
