import React from 'react';
import { NavLink } from 'react-router-dom';

// style imports
import './navigation.css';
import { AppBar, Toolbar, Button, Icon, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		flexGrow: 1,
		color: 'white'
	},
	grow: {
		flexGrow: 1,
		color: 'white'
	},
	menuButton: {
		marginLeft: 0,
		marginRight: 20
	},
	logoLink: {
		borderRight: '1px solid #FFF'
	},
	appBar: {
		backgroundColor: '#5475EE'
	},
	navLinks: {
		display: 'flex'
	}
};

class Navigation extends React.Component {
	handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('firebaseui::rememberedAccounts');
		localStorage.removeItem('token');
		window.location.reload();
	};

	render() {
		const appToken = localStorage.getItem('token');
		const firebaseToken = localStorage.getItem(
			'firebaseui::rememberedAccounts'
		);

		const loggedIn = appToken && firebaseToken;
		const { classes } = this.props;

		return (
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<NavLink
						// if user is logged in, icon takes them to dashboard, otherwise go to marketing page
						to={loggedIn ? '/dashboard' : '/'}
						className={classes.logoLink}
					>
						<Avatar
							className={classes.menuButton}
							src={require('./rocket-logo.png')}
						/>
					</NavLink>
					<div className="nav-links">
						<div>
							<NavLink to="/dashboard">
								{/* style here highlights which tab user is currently on */}
								<Button
									style={
										this.props.history.location.pathname === '/dashboard'
											? { color: 'white' }
											: { color: '#B0C4DE' }
									}
									className={classes.grow}
								>
									<Icon>home</Icon>
								</Button>
							</NavLink>
							<NavLink to="/dashboard/profile">
								<Button
									style={
										this.props.history.location.pathname ===
										'/dashboard/profile'
											? { color: 'white' }
											: { color: '#B0C4DE' }
									}
								>
									<Icon>account_circle</Icon>
								</Button>
							</NavLink>
						</div>
						{/* login/logout operator */}
						{!loggedIn ? (
							<NavLink to="/login">
								<Button className={classes.grow}>Login</Button>
							</NavLink>
						) : (
							<NavLink to="/login" onClick={this.handleLogout}>
								<Button className={classes.grow}>Logout</Button>
							</NavLink>
						)}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(Navigation);
