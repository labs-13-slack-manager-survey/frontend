import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import "./pollCalendar.css";
import PropTypes from 'prop-types';
// import { isSameDay } from "date-fns";
// import parseISO from "date-fns/parseISO";

class PollCalendar extends Component {

  isBlocked = day => {
    const availableDates = ["2019-06-21", "2019-02-04"]
    return !availableDates.some(date => day.isSame(date), 'day')
  }

  render() {
    return (
      <div className="calendar-card">
        <div style={{ marginTop: "60px" }}>
          <div className="report-results-date-picker">
            <DayPickerSingleDateController numberOfMonths={1} noBorder={true}
            isDayBlocked = {this.isBlocked} />
          </div>
        </div>
      </div>
    );
  }
}

export default PollCalendar;
