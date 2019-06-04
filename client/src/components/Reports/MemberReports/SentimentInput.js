import React from 'react';
import TextField from '@material-ui/core/TextField';

// this component handles the response inputs for individual questions
// when a user is filling in a report
// parent component = MemberResponseForm.js

const SentimentInput = props => {
	return (
		<div className="member-report-input">
			<h4>{props.question}</h4>
            hello
			<TextField
				fullWidth={true}
				onChange={e => props.handleChange(e, props.question)}
				margin="normal"
				multiline={true}
				name="response"
				value={props.response}
				variant="outlined"
			/>
		</div>
	);
};

export default SentimentInput;
