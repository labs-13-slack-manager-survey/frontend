import React from 'react';
import './tableDisplay.css';

const TableDisplay = props => (
    <div className="table-display">
        <div className="column-labels">
            <div className="label">{props.column1}</div>
            <div className="label">{props.column2}</div>
            {props.column3 ? <div className="label">{props.column3}</div> : null }
            {props.column4 ? <div className="label">{props.column4}</div> : null }
        </div>
        <div className = "vertical-line" />
        <div className = "content">
            <div className = "column1">hello</div>
            <div className = "column">hello</div>
            <div className = "column">hello</div>
            <div className = "column">hello</div>

        </div>
        
    </div> 
);

export default TableDisplay; 