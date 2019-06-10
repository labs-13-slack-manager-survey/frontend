import React from 'react';
import editActive from '../images/icons/edit-active.png';
import './tableDisplay.css';

const TableDisplay = props => (
    <div className="table-display">
        <div className = "content">
            <div className = "column1">{props.content1}</div>
            <div className = "column">hello</div>
            <div className = "column">hello</div>
            <div className = "column">hello</div>

            <div className = "action-icons">
                <img src={editActive} />
            </div>
        </div>
        
    </div> 
);

export default TableDisplay; 