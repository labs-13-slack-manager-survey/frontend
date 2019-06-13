import React from 'react';
import jwt_decode from "jwt-decode";
import { axiosWithAuth, baseURL } from "../config/axiosWithAuth.js";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	Slide,
	Input
} from '@material-ui/core';

import './inviteUser.css';

// component to invite user to team (only admin access - BE preventions also)

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class InviteUser extends React.Component {
	state = {
		users: [],
		message: '',
		joinCode: '',
		modal: false, 
	}

	componentDidMount() {
		// get user's joinCode from token and setState accordingly. Necessary to invite new team members.
		const joinCode = jwt_decode(localStorage.getItem("token")).joinCode;
		this.setState({
		  joinCode: joinCode
		});
		axiosWithAuth()
		  .get(`${baseURL}/users/team`)
		  .then(res => {
			this.setState({ users: res.data.users });
	
			if (this.state.users.length > 0) {
			  this.setState({ isLoading: false });
			}
		  })
		  .catch(err => console.log(err));
	  }

	  addUser = e => {
		e.preventDefault();
		//create mailObject to post to sendgrid API
		const mailObject = {
		  email: this.state.newMemberEmail,
		  joinCode: this.state.joinCode
		};
		console.log(mailObject);
		//sendgrid endpoint on our back end
		const endpoint = `${baseURL}/email`;
	
		axiosWithAuth()
		  .post(endpoint, mailObject)
		  .then(res => {
			console.log(res);
			this.setState({ message: "Email sent!", modal: true });
		  })
		  .catch(err => {
			console.log(err);
			this.setState({
			  message:
				"There was an issue sending the email, please email your new team member manually.",
			  modal: true
			});
		  });
	  };
	
	  changeHandler = e => {
		this.setState({ newMemberEmail: e.target.value });
	  };
	  clearMessage = () => {
		this.setState({ message: "", modal: false });
	  };
	  
	render () {
		return (
			<div className="inviteUserBox">
				<div className="invite">Invite a new team member</div>
				<form onSubmit={this.addUser} className="inviteUser">
					<Input
						id="outlined-email-input"
						label="Email"
						type="email"
						onChange={this.changeHandler}
						name="newMemberEmail"
						autoComplete="email"
						margin="normal"
						variant="outlined"
						placeholder="add email"
					/>
					<br />
					<Button variant="outlined" type="submit" onClick={this.addUser}>
						Invite
					</Button>
				</form>
				<Dialog
					open={this.state.modal}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.clearMessage}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">{this.state.message}</DialogTitle>

					<Button onClick={() => this.clearMessage()}>x</Button>
				</Dialog>
			</div>
		);
	}
};

export default InviteUser;
