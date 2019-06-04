import React from 'react';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';

// this component handles the response inputs for individual questions
// when a user is filling in a report
// parent component = MemberResponseForm.js


class ReportInput extends React.Component {

	checkSentiment = () => {
		console.log(this.props.isSentiment);
	}

	render () {
		return (
			<div className="member-report-input">
				<h4>{this.props.question}</h4>
				{this.props.isSentiment ? ( 
				<Slider

					min={0}
					max={6}
					step={1}
					onChange={this.handleChange}
        			/>)  : 
				(
					<TextField
						fullWidth={true}
						onChange={e => this.props.handleChange(e, this.props.question)}
						margin="normal"
						multiline={true}
						name="response"
						value={this.props.response}
						variant="outlined"
					/>
				)} 
				<button onClick={this.checkSentiment} >isSentiment</button> 
			</div>
		);
	}
};

export default ReportInput;
