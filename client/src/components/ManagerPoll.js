import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../config/axiosWithAuth";

import TextField from "@material-ui/core/TextField";

class ManagerPoll extends React.Component {
    state = {
        managerQuestions: [],
        managerResponses: [], 
    }
    
    componentDidMount() {
        const endpoint = `${baseURL}/reports/${this.props.reportId}`;
        axiosWithAuth()
          .get(endpoint)
          .then(res => {
            const {
              managerQuestions,
              managerResponses,
            } = res.data.report;
            console.log(managerQuestions);
            
            this.setState({
              managerQuestions,
              managerResponses
            });
          })
          .catch(err => console.log(err));
          console.log(this.state)
      }


    render() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2,'0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        return (
            <div className = "manager-poll-responses">
                <div className = "poll-header-toggle"  onClick={this.toggleManagerQ}>
                <div className="member-form-title">Managers Thoughts</div>
                </div>
                <p className="member-form-subtitle">respond to the manager poll to guide your team's responses to their stand up survey for today ({today})</p> 
                <div className = "vertical-line" />
                <div className = "manager-poll-question">{this.state.managerQuestions[0]}</div>
                <TextField
                    fullWidth={true}
                    onChange={e => this.props.handleChange(e, this.props.question)}
                    margin="normal"
                    multiline={true}
                    name="response"
                    value={this.props.response}
                    variant="outlined"
                />
                <div className = "manager-poll-question">{this.state.managerQuestions[1]}</div>
                <div className = "manager-poll-response">{this.state.managerResponses[1]}</div>
                <div className = "manager-poll-question">{this.state.managerQuestions[2]}</div>
                <div className = "manager-poll-response">{this.state.managerResponses[2]}</div>
                <div className = "manager-poll-question">{this.state.managerQuestions[3]}</div>
                <div className = "manager-poll-response">{this.state.managerResponses[3]}</div>
                <div className = "vertical-line" />
          </div>
        )}
};

export default ManagerPoll; 