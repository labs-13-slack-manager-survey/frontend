import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

// component imports
import CreateTeam from './CreateTeam';
import LandingPage from './LandingPage';
import JoinTeam from './JoinTeam';

// style imports
import './onboarding.css';
class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joinToggle: false,
			createToggle: false,
			singleEmail: '',
			emails: [],
			teamId: null,
			error: '',
			errorModal: false
		};
	}

	// toggles
	joinToggle = e => {
		this.setState({ joinToggle: !this.state.joinToggle });
		this.setState({ createToggle: false });
	};
	createToggle = () => {
		this.setState({ createToggle: !this.state.createToggle });
		this.setState({ joinToggle: false });
	};
	toggleAllOff = () => {
		this.setState({ createToggle: false });
		this.setState({ joinToggle: false });
	};

	// change handler
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	// called when a user clicks 'create team' button in CreateTeam.js
	createTeam = async emails => {
		const teamId = length => {
			return Math.round(
				Math.pow(9, length + 1) - Math.random() * Math.pow(9, length)
			);
		};

		// const joinId = length => {
		// 	return Math.round(
		// 		Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
		// 	)
		// 		.toString(36)
		// 		.slice(1);
		// };

		const randId = await teamId(8);

		//create an object to send to mail api
		const mailObject = {
			//email singular to ensure consistency with adding an new user email on the dashboard
			email: this.state.emails
		};

		try {
			const updated = await axiosWithAuth().put(`${baseURL}/users/`, {
				teamId: randId,
				roles: 'admin',
			});
			localStorage.setItem('token', updated.data.token);

			// if the user's entered emails, make the post call to the email endpoint
			if (mailObject.email[0]) {
				await axiosWithAuth().post(`${baseURL}/email`, mailObject);
			}

			//redirect back to dashboard after team creation
			this.props.history.push('/dashboard');
		} catch (error) {
			this.setState({
				error:
					'There was an issue sending the emails, please be sure to enter valid email addresses. Alternatively, you can pass the join code to your teammates manually. It can be found on your profile.',
				errorModal: true
			});
		}
	};

	// On submit to join a team by join code
	// Sets the user's teamId to match the manager's
	// Also gives user new token
	submitHandler = async e => {
		try {
			const newToken = await axiosWithAuth().get(
				`${baseURL}/users/joinCode/${this.state.joinCode}`
			);
			localStorage.setItem('token', newToken.data.updatedToken);
			this.props.history.push('/dashboard');
		} catch (err) {
			this.setState({
				error: 'There was an issue joining this team. Please contact the devs.',
				errorModal: true
			});
		}
	};

	// If there was an error at any point while onboarding, exiting the error message will remove the error from state
	clearError = () => {
		this.setState({ error: '', errorModal: false });
	};

	// Adds emails to state (in an array) from CreateTeam
	changeEmail = email => {
		this.setState({ emails: email });
	};

	// change handlers for email inputs
	handleAddChip = () => {
		this.setState({ emails: [...this.state.emails, this.state.singleEmail] });
	};

	handleChipChange = email => {
		this.setState({ emails: [...email] });
	};

	render() {
		// Landing Page - all booleans false
		return !this.state.joinToggle && !this.state.createToggle ? (
			<LandingPage
				joinToggle={this.joinToggle}
				createToggle={this.createToggle}
			/>
		) : this.state.createToggle ? (
			// Create a Team page - createToggle true
			<CreateTeam
				createTeam={this.createTeam}
				emails={this.state.emails}
				emailHandler={this.emailHandler}
				joinToggle={this.joinToggle}
				toggleAllOff={this.toggleAllOff}
				changeEmail={this.changeEmail}
				error={this.state.error}
				clearError={this.clearError}
				errorModal={this.state.errorModal}
				handleAddChip={this.handleAddChip}
				handleChipChange={this.handleChipChange}
			/>
		) : (
			// Join a Team page - joinToggle true
			<JoinTeam
				createToggle={this.createToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				submitHandler={this.submitHandler}
				error={this.state.error}
				errorModal={this.state.errorModal}
				clearError={this.clearError}
			/>
		);
	}
}

export default Onboarding;
