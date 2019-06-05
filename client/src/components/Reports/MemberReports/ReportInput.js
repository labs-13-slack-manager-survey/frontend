import React from 'react';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import { withStyles} from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator';
import './Report_Input.css';

// this component handles the response inputs for individual questions
// when a user is filling in a report
// parent component = MemberResponseForm.js

//styles for slider


const StyledSlider = withStyles({
	thumb: {
		height: 24,
		width: 24, 
		backgroundColor: '#F67B28',
		border: `3px solid #fff`,
		'&$focused, &:hover': {
		boxShadow: `0px 0px 0px ${8}px ${fade('#de235b', 0.16)}`,
		},
		'&$activated': {
		boxShadow: `0px 0px 0px ${6}px ${fade('#de235b', 0.16)}`,
		},
		'&$jumped': {
		boxShadow: `0px 0px 0px ${2}px ${fade('#de235b', 0.16)}`,
		},
	},
	track: {
		backgroundColor: '#FEBA47',
		height: 8,
	  },
	  trackAfter: {
		backgroundColor: '#d0d7dc',
	  },
})(Slider);

class ReportInput extends React.Component {
	
	// handleChange = (event, sentimentVal) => {
	// 	this.setState({ this.props.sentimentVal });
	// 	console.log(this.props.sentimentVal)
	// };

	render () {

		return (		
			<div className="member-report-input">
				<h4>{this.props.question}</h4>
				{this.props.isSentiment ? ( 
					<>
					<StyledSlider
						className = "slider"
						value = {this.props.sentimentVal} 
						min={1}
						max={5}
						step={1}
						onChange={(e, v) => this.props.handleChange(e, v)}
						/> 
					<div className="slider-label">
						<p>1</p>
						<p>2</p>
						<p>3</p>
						<p>4</p>	
						<p>5</p>
					</div>	
					</>
						)
					 : 
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
			</div>
		);
	}
};


export default ReportInput;
