import React from 'react';
import './SummaryBox.css';

const SummaryBox = props => (
    <div className="summary-box">
        <div className="summary-box-title">{props.title}</div>
        <div className="summary-box-content">{props.content}</div>
    </div> 
);

export default SummaryBox; 