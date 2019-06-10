import React from 'react';
import editActive from '../images/icons/edit-active.png';
import edit from '../images/icons/edit.png';
import trashCan from '../images/icons/trash.png';
import './tableDisplay.css';

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



class TableDisplay extends React.Component {
    
    render() {
        const time = this.props.report.scheduleTime.split(':');
        let timeStr = `${time[0]}:${time[1]}am`;
        if (time[0] > 12) {
            timeStr = `${time[0] - 12}:${time[1]}pm`;
        }
        const reportId = this.props.report.id;
        
        return (
            <div className="table-display">
            
            <div className = "content">
                <div className = "column1">{this.props.content1}</div>
                <div className = "column">{Date.parse(this.props.report.created_at)}</div>

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


                <div className = "column">hello</div>

                <div className = "action-icons">
                    <img className ="action" src={edit} />
                    <img className ="action" src={trashCan} />

                </div>

            </div>
        
            </div> 
        )}
};

export default TableDisplay; 