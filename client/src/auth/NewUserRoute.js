import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const NewUserRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				const token = localStorage.getItem('token');
				if (!token) {
					return <Redirect to="/login" />;
				}
				const decoded = jwt_decode(token);
				if (decoded.teamId) {
					return <Redirect to="/dashboard" />;
				}
				return <Component {...props} />;
			}}
		/>
	);
};

export default NewUserRoute;
