import React from "react";
import moment from "moment";
const ManagerFeedbackForManagers = ({ managerFeedback, managerPollDays }) => {
  return (
    <>
      <div classname="manager-feedback">
        <div className="user-info">
          <div className="month-day">
            <div className="calendar-top">
              {moment(
                managerFeedback[managerFeedback.length - 1].submitted_date
              ).format("DD")}
            </div>
            <div className="calendar-bot">
              {moment(
                managerFeedback[managerFeedback.length - 1].submitted_date
              ).format("MMMM")}
            </div>
          </div>
          <div className="manager-response-header-text">
            <div className="response-container-main-name-manager">
              Manager Comments
            </div>
          </div>
        </div>
        <div className="linebr" />
        <div className="response-content">
          <div className="manager-question">
            {managerPollDays[managerPollDays.length - 1].managerQuestions[0]}
          </div>
          <div className="manager-response">
            {managerPollDays[managerPollDays.length - 1].managerResponses[0]}
          </div>
          <div className="manager-question">
            {managerPollDays[managerPollDays.length - 1].managerQuestions[1]}
          </div>
          <div className="manager-response">
            {managerPollDays[managerPollDays.length - 1].managerResponses[1]}
          </div>
          <div className="manager-question">
            {managerPollDays[managerPollDays.length - 1].managerQuestions[2]}
          </div>
          <div className="manager-response">
            {managerPollDays[managerPollDays.length - 1].managerResponses[2]}
          </div>
          {managerPollDays[managerPollDays.length - 1].managerQuestions
            .length === 4 ? (
            <>
              <div className="manager-question">
                {
                  managerPollDays[managerPollDays.length - 1]
                    .managerQuestions[3]
                }
              </div>
              <div className="manager-response">
                {
                  managerPollDays[managerPollDays.length - 1]
                    .managerResponses[3]
                }
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ManagerFeedbackForManagers;
