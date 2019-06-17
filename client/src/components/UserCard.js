import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../config/axiosWithAuth.js';

class UserCard extends Component {
    state = {
		profileInfo: [],
		users: [],
		newName: '',
		newPic: '',
    };
    
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
    
  render() {
    return (
      <div>
          <h3>{this.state.profileInfo.fullName}</h3>
          hello
      </div>
    );
  }
}

export default UserCard;

