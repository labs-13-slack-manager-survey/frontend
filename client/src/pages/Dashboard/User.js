import React from 'react';
import jwt_decode from 'jwt-decode';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './dashboard.css';

const options = ['Deactivate'];

const ITEM_HEIGHT = 48;

const User = props => {
	const token = jwt_decode(localStorage.getItem('token'));
	const open = Boolean(props.anchorEl);
	return (
		<div className="singleUserContainer">
			<div className="single-user-card" key={props.user.id}>
				<div className="single-user-content">
					<img
						src={props.user.profilePic}
						className="profilePic"
						alt="profile pic"
					/>
					<h4>{props.user.fullName}</h4>
				</div>
				<div className="single-user-menu">
					<IconButton
						aria-label="More"
						aria-owns={open ? 'long-menu' : undefined}
						aria-haspopup="true"
						onClick={props.handleClickMenu}
						id={
							token.roles === 'member' || token.subject === props.user.id
								? 'display-button'
								: 'activateButton'
						}
					>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="long-menu"
						anchorEl={props.anchorEl}
						open={open}
						onClose={props.handleCloseMenu}
						PaperProps={{
							style: {
								maxHeight: ITEM_HEIGHT * 4.5,
								width: 200
							}
						}}
					>
						{options.map(option => (
							<MenuItem
								key={option}
								selected={option === 'Deactivate'}
								onClick={() => props.deactivateUser(props.user.id)}
							>
								{option}
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default User;
