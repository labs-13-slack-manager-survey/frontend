import React from 'react';

// this component filters users on team, finds the ones who have responded to the current report,
// shows their profile picture on the results page, but slightly transparent. User can click on
// the profile picture to filter reponses by that user

// parent component = ReportResults.js (/pages/Reports/ReportResults)

const ResponseTeamList = props => (
	<div className="responders">
		{props.responders.map(responder => (
			<div onClick={() => {
				const user =
					props.clickedResponder === responder.userId
						? null
						: responder.userId;
				props.filter(props.clickedDate, user);
			}}
			className="username-profile-pic">
			<img
				key={responder.userId}
				src={responder.profilePic}
				alt={responder.fullName}
				className={`responders-user ${
					props.clickedResponder === responder.userId ? 'transparent' : ''
				}`}
			/>
			<div>{responder.fullName}</div>
			</div>
		))}
	</div>
);

export default ResponseTeamList;
