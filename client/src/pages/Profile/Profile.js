import "./profile.css";
import React, { Component } from "react";
import { axiosWithAuth, baseURL } from "../../config/axiosWithAuth.js";
import { Link } from "react-router-dom";

import PageTitle from "../../components/PageTitle";

// style imports
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { Collapse } from "@blueprintjs/core";
import {
  Card,
  Button,
  Input,
  InputLabel,
  TextField,
  FormControl
} from "@material-ui/core";

// this is the whole profile page (dashboard/profile)
// admin and memeber views are different

class Profile extends Component {
  state = {
    profileInfo: [],
    users: [],
    newName: "",
    newPic: "",
    archivedReports: [],
    openArchivedReports: false,
    openEditUser: false,
    openInactiveUsers: false
  };
  render() {
    const inactiveUsers = this.state.users.filter(user => !user.active);

    return (
      <div className="dashboard-view">
        <div className="view">
          <PageTitle title="My Profile" />

          <div className="userCard-content">
            <img
              className="profile-picture-username"
              src={this.state.profileInfo.profilePic}
              alt="a headshot, preferably"
            />
            <div className="profileCard-content">
              <h3>{this.state.profileInfo.fullName}</h3>
              <Hidden smDown>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  className="email-field"
                  label="Email"
                  placeholder={this.state.profileInfo.email}
                  margin="normal"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  disabled
                />
              </Hidden>
              <div className="editUser">
                <Button
                  style={{ margin: "10px 0" }}
                  variant="outlined"
                  color="primary"
                  onClick={this.openUserEdit}
                >
                  {this.state.openEditUser === false ? "Edit" : "Cancel"}
                </Button>
                <Collapse isOpen={this.state.openEditUser}>
                  <Card raised={true}>
                    <form className="userForm" onSubmit={this.updateUser}>
                      <FormControl id="edit-user-content">
                        <InputLabel htmlFor="custom-css-standard-input">
                          Edit Name
                        </InputLabel>
                        <Input
                          id="custom-css-standard-input"
                          type="text"
                          value={this.state.newName}
                          name="newName"
                          onChange={this.changeHandler}
                          placeholder="Enter new name"
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel htmlFor="custom-css-standard-input">
                          Edit Picture
                        </InputLabel>
                        <Input
                          id="custom-css-standard-input"
                          type="text"
                          value={this.state.newPic}
                          name="newPic"
                          placeholder="Enter new picture Link"
                          onChange={this.changeHandler}
                        />
                      </FormControl>
                      <Button
                        style={{ display: "block", margin: "10px 0" }}
                        id="edit-user-button"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={this.openUserEdit}
                      >
                        Submit
                      </Button>
                      <Button
                        style={{ display: "block", margin: "10px 0" }}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={this.deleteProfile}
                      >
                        <Link style={{ color: "white" }} to={`/login`}>
                          Delete Account
                        </Link>
                      </Button>
                      <div />
                    </form>
                  </Card>
                </Collapse>
              </div>
            </div>
          </div>
		  
			 {/* ADMIN VIEW STARTS HERE */}

			 {this.state.profileInfo.roles === "admin" ? (
          <div className="top-user-card">


            <div className="profileForms">
              <h3>Admin Controls</h3>
              <div className="admin-controls">
                <div className="deactivated-users">
                  <Button
                    style={{ margin: "10px 0" }}
                    variant="outlined"
                    color="primary"
                    className={
                      this.state.profileInfo.roles === "admin"
                        ? "activateButton"
                        : "display-button"
                    }
                    onClick={this.viewInactiveUsers}
                  >
                    {this.state.openInactiveUsers
                      ? "Hide Inactive Users"
                      : "Inactive Users"}
                  </Button>
                  <div>
                    <Collapse isOpen={this.state.openInactiveUsers}>
                      {inactiveUsers.length > 0 ? (
                        inactiveUsers.map(user => (
                          <Card key={user.id}>
                            <div key={user.id} className="inactive-user-card">
                              <div className="inactive-user-content">
                                <img
                                  src={user.profilePic}
                                  id="profilePic"
                                  alt="a headshot, preferably"
                                />
                                <h4>{user.fullName}</h4>
                              </div>
                              <Button
                                variant="outlined"
                                className={
                                  this.state.profileInfo.roles === "admin"
                                    ? "activateButton"
                                    : "display-button"
                                }
                                onClick={() => this.activateUser(user.id)}
                                style={{ padding: "0 8px", marginTop: "4px" }}
                              >
                                Activate
                              </Button>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p>No inactive users</p>
                      )}
                    </Collapse>
                  </div>
                </div>
                <div className="deactivated-reports">
                  <Button
                    style={{ margin: "10px 0" }}
                    className={
                      this.state.profileInfo.roles === "admin"
                        ? "activateButton"
                        : "display-button"
                    }
                    variant="outlined"
                    color="primary"
                    onClick={this.viewarchivedReports}
                  >
                    {this.state.openArchivedReports === false
                      ? "View Archived Reports"
                      : "Archived Reports"}
                  </Button>
                  <div>
                    <Collapse isOpen={this.state.openArchivedReports}>
                      {this.state.archivedReports.length < 1 ? (
                        <p>No archived Reports</p>
                      ) : (
                        this.state.archivedReports.map((report, idx) => (
                          <Card key={idx}>
                            <div key={idx} className="inactive-reports-content">
                              <h4 className="report-title">
                                {report.reportName}
                              </h4>

                              <Button
                                variant="outlined"
                                onClick={() =>
                                  this.reactivateReport(report.id, idx)
                                }
                              >
                                Activate
                              </Button>
                            </div>
                          </Card>
                        ))
                      )}
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>


          </div>
		) : null}
		

        </div>
      </div>
    );
  }

  componentDidMount() {
    const endpoint = `${baseURL}/users/byuser`;
    axiosWithAuth()
      .get(endpoint)
      .then(res =>
        this.setState({
          profileInfo: res.data.user
        })
      )
      .catch(err => console.log(err));

    axiosWithAuth()
      .get(`${baseURL}/users/team`)
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => console.log(err));
  }
  viewarchivedReports = () => {
    const endpoint = `${baseURL}/reports`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        const filteredReports = res.data.reports.filter(
          report => !report.active
        );
        this.setState({
          archivedReports: filteredReports,
          openArchivedReports: !this.state.openArchivedReports
        });
      })
      .catch(err => console.log(err));
  };

  reactivateReport = id => {
    const editedReport = {
      active: true
    };
    const newArchivedReports = this.state.archivedReports.filter(
      report => report.id !== id
    );
    console.log(editedReport);
    const endpoint = `${baseURL}/reports/${id}`;
    axiosWithAuth()
      .put(endpoint, editedReport)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({ archivedReports: newArchivedReports });
    // this does not rerender dashboard - report does not show up without a refresh. Sorry!
    // this.props.history.push('/slackr/dashboard');
  };

  updateUser = e => {
    e.preventDefault();
    const endpoint = `${baseURL}/users/`;
    const editedUser = {};
    if (this.state.newName) {
      editedUser.fullName = this.state.newName;
      this.setState({
        profileInfo: {
          ...this.state.profileInfo,
          fullName: editedUser.fullName
        }
      });
    }
    if (this.state.newPic) {
      editedUser.profilePic = this.state.newPic;
      this.setState({
        profileInfo: {
          ...this.state.profileInfo,
          profilePic: editedUser.profilePic
        }
      });
    }
    axiosWithAuth()
      .put(endpoint, editedUser)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  openUserEdit = () => {
    this.setState({ openEditUser: !this.state.openEditUser });
  };

  viewInactiveUsers = () => {
    this.setState({ openInactiveUsers: !this.state.openInactiveUsers });
  };

  activateUser = id => {
    const endpoint = `${baseURL}/users/${id}`;
    const editedUser = {
      active: true
    };
    //create an array with everyone but the user the function's been called on
    const newUsers = this.state.users.filter(user => user.id !== id);

    axiosWithAuth()
      .put(endpoint, editedUser)
      .then(res => {
        newUsers.push(res.data.editedUser);
        this.setState({
          users: newUsers
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteProfile = () => {
    const endpoint = `${baseURL}/users/`;
    axiosWithAuth()
      .delete(endpoint)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("bad", err);
      });
  };
}

export default withWidth()(Profile);
