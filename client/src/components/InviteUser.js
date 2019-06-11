import React from 'react';
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	Slide
} from '@material-ui/core';

import '../pages/Dashboard/dashboard.css';

// component to invite user to team (only admin access - BE preventions also)

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const InviteUser = props => {
	return (
		<div className="inviteUserBox">
			<h3>Invite a new team member</h3>
			<form onSubmit={props.addUser} className="inviteUser">
				<TextField
					id="outlined-email-input"
					label="Email"
					type="email"
					onChange={props.changeHandler}
					name="newMemberEmail"
					autoComplete="email"
					margin="normal"
					variant="outlined"
				/>
				<br />
				<Button variant="outlined" type="submit" onClick={props.addUser}>
					Invite
				</Button>
			</form>
			<Dialog
				open={props.modal}
				TransitionComponent={Transition}
				keepMounted
				onClose={props.clearMessage}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{props.message}</DialogTitle>

				<Button onClick={() => props.clearMessage()}>x</Button>
			</Dialog>
		</div>
	);
};

export default InviteUser;
