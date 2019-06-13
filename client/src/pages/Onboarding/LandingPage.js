import React from 'react';
import {
	Card,
	Button,
	Divider
} from '@material-ui/core';

import './onboarding.css';

const LandingPage = props => {
	return (
		<Card className="onboarding">
			<h2>Welcome to Slackr!</h2>
			<Card raised={true} className="onboardingCard">
				<div className="onboarding-card-content">
					<h3>You can join a team or create your own!</h3>
					<div className="landing-buttons">
						<p>Join a team with your join code!</p>
						<Button
							className="landing-buttons"
							color="primary"
							variant="outlined"
							onClick={props.joinToggle}
						>
							Input join code
						</Button>
					</div>
					<Divider variant="fullWidth" />
					<div className="landing-buttons">
						<p>Create a new team!</p>
						<Button
							color="primary"
							variant="outlined"
							onClick={props.createToggle}
						>
							Create a Team
						</Button>
					</div>
				</div>
			</Card>
		</Card>
	);
};

export default LandingPage;
