import React, { Component } from "react";
import Calendar from "react-calendar";
import "./pollCalendar.css";

class PollCalendar extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Calendar className="calendar"/>
      </div>
    );
  }
}

export default PollCalendar;
