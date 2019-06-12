import React from 'react';
import './pagetitle.css';
import Back from '../images/icons/chevron-back.png';


const PageTitle = props => (
    <div className="title-box">
        {props.secondaryPage ? <img onClick={() => props.history.goBack()} className="back" src={Back}/> : null}
        <div className="page-title">{props.title}</div>
    </div> 
);

export default PageTitle; 