import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  withStyles,
  Card,
  Button,
  Divider,
  Fab,
  Icon
} from "@material-ui/core";

import PageTitle from '../../../components/PageTitle'
import PageDescription from '../../../components/PageDescription'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 0,
    width: 200
  },
  menu: {
    width: 200
  }
});

class ChooseReport extends Component {
  render() {
    return (
      <div className="create-report">
        <PageTitle 
          title = "New Poll"
          {...this.props}
          secondaryPage = {true}
        />
        <PageDescription description= "Select the type of poll you would like to create"/>
          <section className="schedule-card-content">
            <section>
              <Link to="/slackr/dashboard/reports/new">
                <button  className="add-to-slack" variant="outlined" style={{ marginTop: "20px" }}>
                  Standup Survey
                </button>
              </Link>
            </section>
            <section>
              <Link to="/slackr/dashboard/reports/createSentiment">
                <button className="add-to-slack" style={{ marginTop: "20px" }}>
                  Sentiment Poll
                </button>
              </Link>
            </section>
          </section>
      </div>
    );
  }
}

export default withStyles(styles)(ChooseReport);
