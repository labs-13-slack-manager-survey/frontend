import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import { isSameDay } from "date-fns";
import parseISO from "date-fns/parseISO";

class PollCalendar extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="report-results-date-picker">
          <DayPickerSingleDateController numberOfMonths={1} noBorder={true} />
        </div>
      </div>
    );
  }
}

export default PollCalendar;
