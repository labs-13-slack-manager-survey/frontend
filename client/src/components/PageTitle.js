import React from 'react';
import './pagetitle.css';

const PageTitle = props => (
    <div className="title-box">
        {props.mainPage ? "hello ": "back" }
        <div className="page-title">{props.title}</div>
    </div> 
);

export default PageTitle; 