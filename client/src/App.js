import React from 'react';
import { Route } from 'react-router-dom';

// Firebase Login
import Login from './components/Login/Login';

// Onboarding
import Onboarding from './components/Onboarding/Onboarding';

// View houses all components for /dashboard including ReportsDash (shows reports) and Dashboard (shows team)
import View from './components/View/View';
import ReportsDash from './components/Dashboard/ReportsDash';

// Profile Page
import Profile from './components/Profile/Profile';

// Marketing Page
import MarketingPage from './components/Marketing/MarketingPage';
import DevTeam from './components/Marketing/DevTeam';

// Nav and Footer
import Navigation from './components/Navigation/Navigations';
import Footer from './components/Navigation/Footer';

// Slack Routes
import Slack from './components/Slack/Slack';
import SlackRedirect from './components/Slack/SlackRedirect';

//Protected Routes
import PrivateRoute from './auth/PrivateRoute';
import NewUserRoute from './auth/NewUserRoute';

// CSS
import './App.css';

function App() {
	return (
		<div>
			{/* Navigation */}
			<Route path="/" component={Navigation} />

			{/* Marketing Pages */}
			<Route exact path="/" component={MarketingPage} />
			<Route exact path="/team" component={DevTeam} />

			{/* Login */}
			<Route path="/login" component={Login} />

			{/* Onboarding */}
			<NewUserRoute exact path="/onboarding" component={Onboarding} />

			{/* Dashboard */}
			<PrivateRoute exact path="/dashboard" component={View} />

			{/* Reports */}
			<PrivateRoute path="/dashboard/reports" component={ReportsDash} />

			{/* Profile */}
			<PrivateRoute exact path="/dashboard/profile" component={Profile} />

			{/* Slack Connection */}
			<Route exact path="/slack" component={Slack} />
			<Route exact path="/slack/auth" component={SlackRedirect} />
			
			{/* Footer */}
			<Route path="/" component={Footer} />
		</div>
	);
}

export default App;
