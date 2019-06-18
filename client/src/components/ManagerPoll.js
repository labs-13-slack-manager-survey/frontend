import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../config/axiosWithAuth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ManagerPoll extends React.Component {
    state = {
        managerQuestions: [],
        managerResponses: [], 
        response1: '',
        response2: '',
        response3: '',
        response4: '',
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
    
    
      handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


  enterResponsesHandler = e => {
    e.preventDefault();
    const code = e.keyCode || e.which;
    if (code === 13) {
      this.setState(prevState => ({
        [e.target.name]: e.target.value,
        managerResponses: [...prevState.managerResponses, e.target.value],
      }));
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };


    //submit 
    submitReport = () => {
        let managerResponses= [this.state.response1, this.state.response2, this.state.response3, this.state.response4]
        let managerQuestions = this.state.managerQuestions;
        const managerQuestionResponse = { managerQuestions, managerResponses}
        console.log(managerResponses)
        console.log(managerQuestionResponse)
        const endpoint = `${baseURL}/responses/managerQuestions/${this.props.reportId}`;
        // axiosWithAuth()
        //   .post(endpoint, managerQuestionResponse)
        //   .then(res => {
        //       console.log(res)
            //   this.setState(prevState => ({
            //     ...prevState,
            //     questions: prevState.questions.map(q => ({
            //       question: q.question,
            //       response: "",
            //       sentimentRange: 3
            //     })),
    
            //   });
        //     } else {
        //       this.setState(prevState => ({
        //         ...prevState,
        //         questions: prevState.questions.map(q => ({
        //           question: q.question,
        //           response: ""
        //         })),
        //         sentimentQuestions: prevState.sentimentQuestions.map(sq=> ({
        //           sentimentQuestions: sq.question,
        //           response: '', 
        //         }))
        //       }));
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err.response.data);
        //   });
      }

      submitAll = () =>{
        this.submitReport();
        // this.reload()
      }
      
      reload = () => {
        window.location.reload()
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

                <div className = "manager-poll-question"> {this.state.managerQuestions[0]}</div>
                <TextField
                        fullWidth={true}
                        onChange= {this.handleChange}
                        margin="normal"
                        multiline={true}
                        name="response1"
                        value= {this.state.response1}
                        variant="outlined"
                />            
                <div className="linebr" />

                <div className = "manager-poll-question"> {this.state.managerQuestions[1]}</div>
                <TextField
                        fullWidth={true}
                        onChange= {this.handleChange}
                        margin="normal"
                        multiline={true}
                        name="response2"
                        value= {this.state.response2}
                        variant="outlined"
                />            
                <div className="linebr" />

                <div className = "manager-poll-question"> {this.state.managerQuestions[2]}</div>
                <TextField
                        fullWidth={true}
                        onChange= {this.handleChange}
                        margin="normal"
                        multiline={true}
                        name="response3"
                        value= {this.state.response3}
                        variant="outlined"
                />     
                

                {this.state.managerQuestions.length==4 ? <><div className="linebr" /><div className = "manager-poll-question"> {this.state.managerQuestions[3]}</div>
                <TextField
                        fullWidth={true}
                        onChange= {this.handleChange}
                        margin="normal"
                        multiline={true}
                        name="response4"
                        value= {this.state.response4}
                        variant="outlined"
                />     
                </> : null }
{/* 
                {this.state.managerQuestions.map((question, index) => (
                    <>
                    <div className = "manager-poll-question">{question}</div>
                        {/* <TextField
                        fullWidth={true}
                        onChange= {this.enterResponsesHandler}
                        key = {index}
                        margin="normal"
                        multiline={true}
                        name="response"
                        value= {response}
                        variant="outlined"
                        />                 */}

     
                <Button
                    style={{
                    display: "block",
                    margin: "auto",
                    marginTop: "30px",
                    marginBottom: "30px"
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={this.submitAll}
                    >
                    Submit Report
                </Button>

          </div>
        )}
};

export default ManagerPoll; 