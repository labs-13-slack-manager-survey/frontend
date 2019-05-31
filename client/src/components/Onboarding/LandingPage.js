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
			<h2>Welcome to Stand-Em-Ups!</h2>
			<Card raised={true} className="onboardingCard">
				<div className="onboarding-card-content">
					<h3>Create your team!</h3>
					<div className="landing-buttons">
						<Button
							color="primary"
							variant="outlined"
							onClick={props.createToggle}
						>
							Create Team
						</Button>
					</div>
				</div>
			</Card>
		</Card>
	);
};

export default LandingPage;
