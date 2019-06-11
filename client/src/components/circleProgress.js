import React from 'react';
import $ from 'jquery';
import jCircle from 'jquery-circle-progress';
import './circleProgress.css';


class circleProgress extends React.Component {

    render() {
        $('#circle').circleProgress({
            value: this.props.percentComplete,
            size: 230,
            fill: {
              gradient: ['#8BD8FF' , '#0069D2']
            },
            startAngle: -Math.PI/2,
            thickness: 40, 
            animation: { duration: 1400,},
            emptyFill: 'rgb(231, 254, 255)',

          });
    
          const numericPercent = this.props.percentComplete *100; 
        return (
            <div className="circle-graph">
                <div className = "circle" id="circle" />
                <div className = "circle-background"></div>
                <div className = "percent-complete">
                    <div className = "number">{numericPercent}</div>
                    <div className = "percent">%</div>
                </div>
                
            </div>
        )}
};

export default circleProgress; 