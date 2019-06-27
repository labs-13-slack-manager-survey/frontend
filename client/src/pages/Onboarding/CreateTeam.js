import React, { Component } from "react";

import {
  Card,
  Button,
  Fab,
  Icon,
  Dialog,
  DialogTitle,
  Slide
} from "@material-ui/core";

import "./onboarding.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateTeam extends Component {
  render() {
    return (
      <div className="onboarding">
        <Card raised={true} className="onboardingCard">
          <div className="onboarding-card-content">
            <Button
              color="primary"
              variant="contained"
              onClick={this.props.createTeam}
            >
              Create Team
            </Button>
          </div>
        </Card>
        <Dialog
          open={this.props.errorModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.clearError}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.error}
          </DialogTitle>

          <Button onClick={() => this.props.clearError()}>x</Button>
        </Dialog>
        <div className="create-team-buttons">
          <Fab
            onClick={this.props.toggleAllOff}
            color="default"
            className="onboarding-back"
          >
            <Icon>arrow_back</Icon>
          </Fab>
          {/* <Button variant="outlined" onClick={this.props.joinToggle}>
            Join an Existing Team
          </Button> */}
        </div>
      </div>
    );
  }
}

export default CreateTeam;
