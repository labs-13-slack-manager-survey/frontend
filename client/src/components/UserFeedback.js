import React from 'react';
import './userFeedback.css';
import Comment from '../images/icons/feedback-white.png'

const UserFeedback = props => (
    <div className = "user-feedback">  
        <div className= "feedback-description">send feedback</div>
        <div className="feedback-button">
            <img className = "speech-bubble" src = {Comment} />
        </div> 
    </div>
);

export default UserFeedback; 