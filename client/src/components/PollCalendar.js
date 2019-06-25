import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import "./pollCalendar.css";
// import { isSameDay } from "date-fns";
// import parseISO from "date-fns/parseISO";

class PollCalendar extends Component {
  render() {
    return (
      <div className="calendar-card">
        <div style={{ marginTop: "60px" }}>
          <div className="report-results-date-picker">
            <DayPickerSingleDateController numberOfMonths={1} noBorder={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default PollCalendar;
