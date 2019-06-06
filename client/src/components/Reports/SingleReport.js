import React from 'react';
import { Link } from 'react-router-dom';

// style imports
import {
	Card,
	Fab,
	Dialog,
	DialogTitle,
	Slide,
	Button
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './reports.css';

// this component displays a single report as a card on /dashboard
// parent component = Reports.js

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class SingleReport extends React.Component {
	state = {
		dialogOpen: false,
	}

	render() {
	const week = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];

	// time refactor for api call
	const time = this.props.report.scheduleTime.split(':');
	let timeStr = `${time[0]}:${time[1]}am`;
	if (time[0] > 12) {
		timeStr = `${time[0] - 12}:${time[1]}pm`;
	}
	const reportId = this.props.report.id;


	return (
		<Card raised={true} className="reportsCard">
			<div className="single-report-header">
				<Link
					to={`/slackr/dashboard/reports/${this.props.report.id}`}
					style={{ textDecoration: 'none' }}
				>
					<h1 className="reports-card-title">{this.props.report.reportName}</h1>
				</Link>
				<div className="single-report-buttons">
					<Link
						to={`/slackr/dashboard/reports/${this.props.report.id}/edit`}
						id={this.props.role !== 'admin' ? 'display-link' : ''}
					>
						<Fab
							color="default"
							size="small"
							aria-label="Edit"
							id={this.props.role !== 'admin' ? 'disabled-link' : ''}
						>
							<Icon>edit_icon</Icon>
						</Fab>
					</Link>
					<Fab
						color="secondary"
						size="small"
						aria-label="Delete"
						// onClick={() => this.props.archiveReport(this.props.report.id)}
						// onClick={() => this.props.handleArchive()}
						onClick={() => this.setState({dialogOpen: true})}
						id={this.props.role !== 'admin' ? 'display-link' : ''}
					>
						<Icon>delete_icon</Icon>
					</Fab>
					<Dialog
						open={this.state.dialogOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={this.props.clearError}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">
							Are you sure you'd like to archive this report? {reportId}
						</DialogTitle>

						<Button onClick={() => this.props.archiveReport(this.props.report.id)}>
							Yes
						</Button>
						<Button onClick={() => 
							this.props.ConsoleCheck(this.props.report.id)
							// this.props.handleArchive()
							}>id</Button>

						//testing purposes
						<Button onClick={() => {
							console.log(this.props.report.id)
							this.setState({dialogOpen: false})
							}}>No</Button>
					</Dialog>
				</div>
			</div>
			<div className="single-report-content">
				<Link
					to={`/slackr/dashboard/reports/${this.props.report.id}`}
					style={{ textDecoration: 'none' }}
				>
					<h4 className="reports-card-schedule">Schedule</h4>
					<div className="reports-card-flex">
						<div className="reports-card-flex-icon">
							<Icon>calendar_today</Icon>
						</div>
						<section className="reports-card-flex-days">
							{week.map((day, idx) => (
								<div
									key={day}
									className={`day ${
										this.props.report.schedule.includes(day) ? 'selected' : ''
									}`}
								>
									{/* if M/W/F, only show first letter, otherwise first 2 */}
									{idx === 0 || idx === 2 || idx === 4
										? day.charAt(0)
										: day.charAt(0) + day.charAt(1)}
								</div>
							))}
						</section>
					</div>
					<div className="reports-card-flex whitespace">
						<div className="reports-card-flex-icon">
							<Icon style={{ color: '#5475EE' }}>alarm</Icon>
						</div>
						<div className="reports-card-time" style={{ color: '#000' }}>
							{timeStr}
						</div>
					</div>
				</Link>
			</div>
		</Card>
	);
	}
};

export default SingleReport;
