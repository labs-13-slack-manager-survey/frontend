import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  withStyles,
} from "@material-ui/core";

import PageTitle from '../../../components/PageTitle'
import PollDescription from '../../../components/PollDescription'

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
          title = "Type of Poll"
          {...this.props}
          secondaryPage = {true}
        />
        <PollDescription description= "Select the type of poll you would like to create"/>
          <section className="schedule-card-content">
            <section>
              <Link to="/slackr/dashboard/reports/new">
                <button  className="add-to-slack" variant="outlined" style={{ marginTop: "20px", cursor:"pointer"}}>
                  Standup Survey
                </button>
              </Link>
            </section>
            <section>
              <Link to="/slackr/dashboard/reports/createSentiment">
                <button className="add-to-slack" style={{ marginTop: "20px", cursor:"pointer" }}>
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
