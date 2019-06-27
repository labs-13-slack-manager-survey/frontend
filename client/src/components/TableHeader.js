import React from 'react';
import './tableDisplay.css';

const TableDisplay = props => (
    <div className="table-display-header">
        <div className="column-labels">
            <div className="label">{props.column1}</div>
            <div className="label">{props.column2}</div>
            {props.column3 ? <div className="label">{props.column3}</div> : null }
            {props.column4 ? <div className="label">{props.column4}</div> : null }
            {props.column5 ? <div className="label">{props.column5}</div> : null }
            <div className="spacer"></div>
        </div>
        <div className = "vertical-line-header" />
        
    </div> 
);

export default TableDisplay; 