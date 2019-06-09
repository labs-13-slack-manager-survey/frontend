import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// style imports
import './navigation.css';
import { AppBar, Toolbar, Button, Icon, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../images/logo_v1.png';
import Teams from '../../images/icons/teams.png';
import TeamsActive from '../../images/icons/teams-active.png';
import User from '../../images/icons/user.png';
import UserActive from '../../images/icons/user-active.png';
import Stats from '../../images/icons/stats.png';
import StatsActive from '../../images/icons/stats_active.png'
import Logout from '../../images/icons/logout.png';

const styles = {
  // root: {
  // 	flexGrow: 1,
  // 	color: 'white'
  // },
  // grow: {
  // 	flexGrow: 1,
  // 	color: 'white'
  // },
  // menuButton: {
  // 	marginLeft: 0,
  // 	marginRight: 0
  // },
  // logoLink: {
  //   borderRight: "1px solid #FFF"
  // },
  // appBar: {
  // 	height: 50,
  // 	backgroundColor: 'white',
  // 	boxShadow: 'none',
  // 	borderBottom: '2px solid #F5F5F5'
  // },

  navLinks: {
    display: "flex"
  }
};

class Navigation extends React.Component {
  handleLogout = e => {
    console.log("logged out");
    e.preventDefault();
    localStorage.removeItem("firebaseui::rememberedAccounts");
    localStorage.removeItem("token");
    window.location.reload();
  };

  render() {
    const appToken = localStorage.getItem("token");
    const firebaseToken = localStorage.getItem(
      "firebaseui::rememberedAccounts"
    );

    const loggedIn = appToken && firebaseToken;
    const { classes } = this.props;

    return (
      <>
        {/* <AppBar position="static" className={classes.appBar}> */}
        <div className="horizontalMenuBar">
          <div className="left-horizontal">
            <NavLink
              // if user is logged in, icon takes them to dashboard, otherwise go to marketing page
              to={loggedIn ? "/slackr/dashboard" : "/"}
              className={classes.logoLink}
            >
              <img className="logo" src={Logo} />
            </NavLink>
            <div>slackr</div>
          </div>
          <div className="horizontal-buttons">
            <NavLink to="/slackr/dashboard/reports/choose">
              <button className="menu-bar-add-poll">
                <span>+</span> Add Poll
              </button>
            </NavLink>

            <NavLink to="/dashboard/reports/choose">
							<button className = "menu-bar-add-team"><span>+</span> Team Member</button>
						</NavLink>
          </div>
          {/* <div className="nav-links"> */}
          {/* <div> */}
          {/* <NavLink to="/dashboard"> */}
          {/* style here highlights which tab user is currently on */}
          {/* <Button
										style={
											this.props.history.location.pathname === '/dashboard'
												? { color: 'white' }
												: { color: '#B0C4DE' }
										}
										className={classes.grow}
									>
										<Icon>home</Icon>
									</Button> */}
          {/* </NavLink> */}
          {/* <NavLink to="/dashboard/profile">
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
								</NavLink> */}
          {/* </div>  */}
          {/* login/logout operator
							{!loggedIn ? (
								<NavLink to="/login">
									<Button className={classes.grow}>Login</Button>
								</NavLink>
							) : (
								<NavLink to="/login" onClick={this.handleLogout}>
									<Button className={classes.grow}>Logout</Button>
								</NavLink>
							)}
						</div> */}
				</div>
				<div className = "verticalBar">
					{loggedIn ? (
					<div className = "vert-buttons">
					<div className = "menu-button">
							<NavLink to='/slackr/dashboard' > <img className = "menu-icon" src={this.props.history.location.pathname ===
											'/slackr/dashboard' ? TeamsActive : Teams} /></NavLink>
							<div className ={this.props.history.location.pathname ===
											'/slackr/dashboard' ? "button-label-active" : "button-label"}>reports</div>
						</div>
						<div className = "menu-button">
              <NavLink to="/slackr/dashboard/stats">
                  <img className="menu-icon" src={this.props.history.location.pathname === '/slackr/dashboard/stats' ? StatsActive : Stats} />
                  <div className = {this.props.history.location.pathname ===
											'/slackr/dashboard/stats' ? "button-label-active" : "button-label"} >stats</div>
                </NavLink>
						</div>
					</div>
               

            ): (
                <div className = "empty-buttons"/>
              )}
                {loggedIn ? (
							<>
							<div className = "vert-buttons">
								<NavLink to="/slackr/dashboard/profile" className = "menu-button">
									<img className = "menu-icon" src={this.props.history.location.pathname ===
											'/slackr/dashboard/profile' ? UserActive : User} />
									<div className = {this.props.history.location.pathname ===
											'/slackr/dashboard/profile' ? "button-label-active" : "button-label"} >user</div>
								</NavLink>
								<NavLink to="/login" onClick = {this.handleLogout} className = "menu-button">
									<img className = "menu-icon" src={Logout} />
									<div className ="button-label-logout">logout</div>
								</NavLink> </div> </>
							) : (
								<NavLink to="/login" onClick = {this.handleLogout} className = "menu-button">
									<img className = "menu-icon" src={Logout} />
									<div className = "button-label-logout">login</div>
							</NavLink>
						)}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Navigation);
