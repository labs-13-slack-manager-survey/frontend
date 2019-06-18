import React from "react";
import { NavLink, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth";

// style imports
import './navigation.css';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../images/slackr_icon.png';
import Reports from '../../images/icons/reports.png';
import ReportsActive from '../../images/icons/reports-active.png';
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
    e.preventDefault();
    localStorage.removeItem("firebaseui::rememberedAccounts");
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  slackAuthCheck = e => {
    const token = jwt_decode(localStorage.getItem("token"));

    e.preventDefault();
    const endpoint = `${baseURL}/slack/channels`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            slackModal: true
          });
        } else {
          this.props.history.push("dashboard/reports/choose");
        }
      })
      .catch(err => {
        this.setState({
          slackModal: true
        });
        console.log(err);
      });
  };

  render() {
    const token = jwt_decode(localStorage.getItem("token"));
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
            {token.roles == "admin" ? (
              <NavLink to="/slackr/dashboard/reports/new">
                <button
                  className="menu-bar-add-poll"
                  onClick={token.roles !== "admin" ? this.slackAuthCheck : null}
                >
                  <span>+</span>Schedule Survey
                </button>
              </NavLink>
            ) : null}
          </div>
        </div>
        <div className="verticalBar">
          {loggedIn && token.teamId ? (
            <div className="vert-buttons">
              <div className="menu-button">
                <NavLink to="/slackr/dashboard">
                  {" "}
                  <img
                    className="menu-icon"
                    src={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard"
                        ? ReportsActive
                        : Reports
                    }
                  />
                </NavLink>
                <div
                  className={
                    this.props.history.location.pathname === "/slackr/dashboard"
                      ? "button-label-active"
                      : "button-label"
                  }
                >
                  reports
                </div>
              </div>
              <div className="menu-button">
                <NavLink to="/slackr/dashboard/stats">
                  <img
                    className="menu-icon"
                    src={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/stats"
                        ? StatsActive
                        : Stats
                    }
                  />
                  <div
                    className={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/stats"
                        ? "button-label-active"
                        : "button-label"
                    }
                  >
                    stats
                  </div>
                </NavLink>
              </div>
              <div className="menu-button">
                <NavLink to="/slackr/dashboard/myteam">
                  <img
                    className="menu-icon"
                    src={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/myteam"
                        ? TeamsActive
                        : Teams
                    }
                  />
                  <div
                    className={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/myteam"
                        ? "button-label-active"
                        : "button-label"
                    }
                  >
                    my team
                  </div>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="empty-buttons" />
          )}
          {loggedIn ? (
            <>
              <div className="vert-buttons2">
                <NavLink to="/slackr/dashboard/profile" className="menu-button">
                  <img
                    className="menu-icon"
                    src={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/profile"
                        ? UserActive
                        : User
                    }
                  />
                  <div
                    className={
                      this.props.history.location.pathname ===
                      "/slackr/dashboard/profile"
                        ? "button-label-active"
                        : "button-label"
                    }
                  >
                    user
                  </div>
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={this.handleLogout}
                  className="menu-button"
                >
                  <img className="menu-icon" src={Logout} />
                  <div className="button-label-logout">logout</div>
                </NavLink>{" "}
              </div>{" "}
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={this.handleLogout}
              className="menu-button"
            >
              <img className="menu-icon" src={Logout} />
              <div className="button-label-logout">login</div>
            </NavLink>
          )}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Navigation);
