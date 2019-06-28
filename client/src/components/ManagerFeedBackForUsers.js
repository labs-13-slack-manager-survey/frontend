import React from "react";
import ToggleOn from "../images/icons/chevron-down.png";
import ToggleOff from "../images/icons/chevron-up.png";
const ManagerFeedBackForUsers = ({
  toggleManagerQ,
  seeManagerQ,
  managerPollDays
}) => {
  return (
    <>
      <div classname="manager-feedback-for-users" onClick={toggleManagerQ}>
        <div className="poll-header">
          <div className="toggle-manager-questions">
            <div className="member-form-title">Manager Comments</div>
            <img
              className="manager-toggle"
              src={seeManagerQ ? ToggleOff : ToggleOn}
              alt=""
            />
          </div>
          <p className="member-form-subtitle">
            View your manager's responses to his poll to guide your responses
            and goals for the day
          </p>
        </div>
        {seeManagerQ ? (
          <>
            <div className="vertical-line" />
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
            {/* check if there's a 4th question */}
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
          </>
        ) : null}
      </div>
    </>
  );
};

export default ManagerFeedBackForUsers;
