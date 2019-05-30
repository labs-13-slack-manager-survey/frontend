import React from 'react';
import Firebase from '../Firebase/Firebase';
import Card from '@material-ui/core/Card';

import './login.css';
import { Divider } from '@material-ui/core';

const Login = props => {
	return (
		<Card className="login-card" raised={true}>
			<h2>Stand-Em-Ups</h2>
			<p>Login or Sign up using a Google or Github account.</p>
			<Divider variant="fullWidth" />
			<div className="firebase-card">
				<Firebase {...props} />
			</div>
		</Card>
	);
};

export default Login;
