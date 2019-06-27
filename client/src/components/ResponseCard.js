import React from "react";
import ToggleOn from "../images/icons/chevron-down.png";
import ToggleOff from "../images/icons/chevron-up.png";
import moment from "moment";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
const StyledSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#4A90E2",
    border: `3px solid #fff`
  },
  track: {
    backgroundColor: "#A0CBFF",
    height: 8,
    borderRadius: "10px"
  },
  trackAfter: {
    backgroundColor: "#d0d7dc"
  }
})(Slider);
const ResponseCard = ({ day, toggleManagerQList, seeManagerQList }) => {
  return (
    <>
      <div className="response-container-manager">
        <div className="user-info">
          <div className="month-day">
            <div className="calendar-top">
              {moment(day[0].managerResponse.managerSubmitted).format("DD")}
            </div>
            <div className="calendar-bot">
              {moment(day[0].managerResponse.managerSubmitted).format("MMMM")}
            </div>
          </div>
          <div
            className="manager-response-header-text"
            onClick={toggleManagerQList}
          >
            <div className="response-container-main-name-manager">
              Manager Comments
            </div>
            <img
              className="manager-toggle-list"
              src={seeManagerQList ? ToggleOff : ToggleOn}
              alt=""
            />
          </div>
        </div>
        {seeManagerQList ? (
          <>
            <div className="linebr" />
            <div className="response-container-main">
              <div className="response-content">
                <div className="manager-question">
                  {day[0].managerResponse.managerQuestions[0]}
                </div>
                <div className="manager-response ">
                  {day[0].managerResponse.managerResponses[0]}
                </div>
                <div className="linebr" />

                <div className="manager-question">
                  {day[0].managerResponse.managerQuestions[1]}
                </div>
                <div className="manager-response ">
                  {day[0].managerResponse.managerResponses[1]}
                </div>
                <div className="linebr" />

                <div className="manager-question">
                  {day[0].managerResponse.managerQuestions[2]}
                </div>
                <div className="manager-response ">
                  {day[0].managerResponse.managerResponses[2]}
                </div>
                {day[0].managerResponse.managerQuestions.length === 4 ? (
                  <>
                    <div className="linebr" />
                    <div className="manager-question">
                      {day[0].managerResponse.managerQuestions[3]}
                    </div>
                    <div className="manager-response ">
                      {day[0].managerResponse.managerResponses[3]}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="response-container" onClick={toggleManagerQList}>
        <div className="response-content">
          {day[1] && day[1].userResponse.responses.length > 0 ? (
            day[1].userResponse.responses.map(userRes => (
              <>
                <div className="response-container-main">
                  <div className="vertical-timeline" />
                  <div className="response-content">
                    <div className="user-response-header">
                      <div className="user-info">
                        <img
                          className="response-container-profile-pic"
                          src={userRes.profilePic}
                          alt=""
                        />
                        <div className="response-container-main-name-user">
                          {userRes.fullName}
                        </div>
                      </div>
                      <div>
                        <div className="month-day">
                          <div className="calendar-top">
                            {moment(day[1].userResponse.date).format("MMMM DD")}
                          </div>
                        </div>
                      </div>
                    </div>

                    <ol>
                      {" "}
                      {userRes.questions.map(userQA => (
                        <>
                          <li>
                            <div className="response-container-main-question">
                              {userQA.question}
                            </div>
                          </li>
                          {userQA.sentimentRange ? null : (
                            <>
                              <div className="response-container-main-answer ">
                                <em>A:</em> {userQA.answer}
                              </div>{" "}
                              <div className="linebr" />{" "}
                            </>
                          )}

                          {userQA.sentimentRange ? (
                            <>
                              <StyledSlider
                                className="slider"
                                value={userQA.sentimentRange}
                                min={1}
                                max={5}
                                step={1}
                              />
                              <div className="slider-label">
                                <p
                                  className={
                                    userQA.sentimentRange !== 1
                                      ? "deselected"
                                      : null
                                  }
                                >
                                  1
                                </p>
                                <p
                                  className={
                                    userQA.sentimentRange !== 2
                                      ? "deselected"
                                      : null
                                  }
                                >
                                  2
                                </p>
                                <p
                                  className={
                                    userQA.sentimentRange !== 3
                                      ? "deselected"
                                      : null
                                  }
                                >
                                  3
                                </p>
                                <p
                                  className={
                                    userQA.sentimentRange !== 4
                                      ? "deselected"
                                      : null
                                  }
                                >
                                  4
                                </p>
                                <p
                                  className={
                                    userQA.sentimentRange !== 5
                                      ? "deselected"
                                      : null
                                  }
                                >
                                  5
                                </p>
                              </div>
                              <div className="linebr" />
                              {userQA.answer ? (
                                <>
                                  <div className="response-container-main-comment ">
                                    <em>Comment:</em> {userQA.answer}
                                  </div>{" "}
                                  <div className="linebr" />{" "}
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="no-report-error">no reports for day</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResponseCard;
