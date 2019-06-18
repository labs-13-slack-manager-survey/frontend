import React from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth, baseURL } from "../config/axiosWithAuth.js";

import editActive from '../images/icons/edit-active.png';
import edit from '../images/icons/edit.png';
import trashCan from '../images/icons/trash.png';
import './tableDisplay.css';
import {
	Dialog,
    DialogTitle,
    Slide,
} from '@material-ui/core';

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

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class TableDisplay extends React.Component {
    state = {
        dialogOpen: false,
        totalResponses: 0
	}
    render() {
        const time = this.props.report.scheduleTime.split(':');
        let timeStr = `${time[0]}:${time[1]}am`;
        if (time[0] > 12) {
            timeStr = `${time[0] - 12}:${time[1]}pm`;
        }
        const reportId = this.props.report.id;
        const dateString  = new Date(this.props.report.created_at);
        return (
            <div className="table-display">

            <div className = "content">
            <Link
				to={`/slackr/dashboard/reports/${this.props.report.id}`}
				style={{ textDecoration: 'none' }} className = "column1">
                <div>{this.props.content1}</div>
                </Link>
                <div className = "date">{dateString.getMonth()+1}/{dateString.getDate()}/{dateString.getFullYear()}</div>

                <div className = "schedule-time">
                    {week.map((day, idx) => (
                            <div
                                key={day}
                                className={`day ${
                                    this.props.report.schedule.includes(day) ? 'selectedDays' : ''
                                }`}
                            >
                                {/* if M/W/F, only show first letter, otherwise first 2 */}
                                {idx === 0 || idx === 2 || idx === 4
                                    ? day.charAt(0)
                                    : day.charAt(0) + day.charAt(1)}
                            </div>
                        ))}
                </div>


                <div className = "column">{this.state.totalResponses}</div>

                {this.props.role == 'admin' ? <div className = "action-icons">
                    <Link
						to={`/slackr/dashboard/reports/${this.props.report.id}/edit`}
						id={this.props.role !== 'admin' ? 'display-link' : ''}
					>
                        <img className ="action" src={edit} />
                    </Link>

                    <img onClick={() => this.setState({dialogOpen: true})} id={this.props.role !== 'admin' ? 'display-link' : ''} className ="action" src={trashCan} />

                    <Dialog
						open={this.state.dialogOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={this.props.clearError}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">
							Are you sure you'd like to archive this report? 
						</DialogTitle>

						<button onClick={() => this.props.archiveReport(this.props.report.id)}>
							Yes
						</button>
						<button onClick={() => {
							this.setState({dialogOpen: false})
							}}>No</button>
					</Dialog>

                </div> : null }

            </div>
                            
            </div> 
        )}

    componentDidMount(){
        axiosWithAuth()
        .get(`${baseURL}/reports/submissionRate`)
        .then(res => {
          this.setState({
            totalResponses: res.data.totalResponses,
          })
        })
        .catch(err => console.log(err))
  
    }
};

export default TableDisplay; 