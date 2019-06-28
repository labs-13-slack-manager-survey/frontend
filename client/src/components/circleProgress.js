import React from "react";
import $ from "jquery";
import "./circleProgress.css";

class circleProgress extends React.Component {
  render() {
    $("#circle").circleProgress({
      value: this.props.percentComplete,
      size: 150,
      fill: {
        gradient: ["#8BD8FF", "#0069D2"]
      },
      startAngle: -Math.PI / 2,
      thickness: 15,
      animation: { duration: 1400 },
      emptyFill: "rgb(231, 254, 255)"
    });
    const numericPercent = Math.trunc(this.props.percentComplete * 100);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    return (
      <div className="circle-graph">
        <div className="title">{this.props.title}</div>
        <div className="circle-graph-contents">
          <div className="circle" id="circle" />
          <div className="circle-background" />
          <div className="text-description">
            <div className="percent-complete">
              <div className="number">{numericPercent}</div>
              <div className="percent">%</div>
            </div>
            <div className="description">Completed</div>
            <div className="today-date">{today}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default circleProgress;
